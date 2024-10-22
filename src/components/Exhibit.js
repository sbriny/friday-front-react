import React, {useEffect, useState, useRef} from 'react';

import styled from '@emotion/styled';
import '../assets/style/font.css';

import AddElementDialog from './CharacterAdd';
import CharacterMenu from './CharacterMenu';
import axios from 'axios';

//页面网格容器；
const FlexContainer = styled.div`
margin-top: 3rem;
padding: .5rem;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
grid-auto-flow: dense;
gap: .5rem;
justify-content: center;
width: 100%;
max-width:100%;
box-sizing: border-box;
overflow: auto;
overflow-x: hidden;
z-index:999;
`;

//Normal容器；
const Item=styled.div`
border: 1px solid #abc;
border-radius: 15px;
// overflow: hidden;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
`;

//容器内标题元素；
const Title=styled.div`
width:100%;
display: block;
color: #000;
font-weight:500;
overflow:hidden;
white-space: nowrap;
text-overflow:ellipsis;
font-size: 1.0rem;
font-family: Arial,sans-serif;
// background-color: yellow;
flex-grow: 1;
display: flex;
align-items: center;
`;

const Video = styled.video`
width: 100%;
height: auto;
object-fit: contain;
// transition: transform .3s ease;
// border: 1px solid #acc;
// &:hover{
//     transform: scale(1.05);
// }
`;

const VideoInfoContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
border: 1px solid #acc;
width: 100%;
height: 7rem;
max-height: 300px;
`;

const VideoPosterContainer = styled.div`
width: 30%;
display: flex;
align-items: center;
justify-content: center;
`;

const VideoPoster = styled.img`
    height: 90%;
    border-radius: 12px;
    transition: transform .3s ease;
&:hover{
    transform: scale(3.05);
}
`;

const VideoInfo = styled.div`
    display: flex;
    flex-direction: column;
    // border: 1px solid #acc;
    width: 70%;
`;

const VideoInfoText = styled.div`
    font-size: 0.9rem;
    color: #333;
    // background: green;
    padding-bottom: 3px;
`;

const Exhibit = () =>{
    
    const [videoProperties,setVideoProperties]=useState([]);

    const videoRefs = useRef({});

    useEffect(() => {
        selectBySeries();
    }, []);
    // 空依赖数组，只在组件挂载时运行;

    const selectBySeries = async () => {
        try {
          console.log("Fetching data...");
          const response = await axios.post("/friday/video/selectBySeries", {
            "videoStudio": "Playtime Video"
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log("API response:", response.data);
          const rl = response.data;
          console.log("Data to be set:", rl);
          setVideoProperties(rl);
        } catch (error) {
          console.error("selectBySeries failed", error);
        }
    };

    const handleMouseEnter = (videoId) => {
        const video = videoRefs.current[videoId];
        if(video){
            video.play().catch(e=>console.log("Autoplay prevented: ", e));
        }
    }

    const handleMouseOut = (videoId) => {
        const video = videoRefs.current[videoId];
        if(video){
            video.pause();
            video.current=0;
        }
    }

    return (
        <FlexContainer>
          {videoProperties && videoProperties.map(({
            videoId, videoFileName, videoTitle, videoPosterUrl, videoFrontCoverSavedPath, 
            videoPosterSavedPath, videoYear, videoTag, videoLength, videoStudio
          }, index) => {
            const dir = "/material";
            let videoRealPath = `${dir}/videos/${videoFileName}`;
            const ppath = videoPosterSavedPath || videoFrontCoverSavedPath;
            const posterPath = `${dir}/posters/${ppath}`;
            const tags = Array.isArray(videoTag) ? videoTag.join(', ') : videoTag;
    
            return (
              <Item key={videoId || index} onMouseEnter={() => handleMouseEnter(videoId)} onMouseLeave={() => handleMouseOut(videoId)}>
                <Video 
                  ref={el => videoRefs.current[videoId] = el}
                  src={videoRealPath} 
                  width="100%" 
                  height="auto"
                  preload="metadata"
                  muted
                  loop
                  onError={(e) => console.error(`Video error for ${videoFileName}:`, e)}
                />
                <VideoInfoContainer>
                  <VideoPosterContainer>
                    {posterPath && <VideoPoster src={posterPath} alt={videoTitle} />}
                  </VideoPosterContainer>
                  <VideoInfo>
                    <Title>{videoTitle}</Title>
                    <VideoInfoText>{videoYear}</VideoInfoText>
                    <VideoInfoText>{videoLength} 分钟</VideoInfoText>
                    <VideoInfoText>Studio: {videoStudio}</VideoInfoText>
                    <VideoInfoText>Tags: {tags}</VideoInfoText>
                  </VideoInfo>
                </VideoInfoContainer>
              </Item>
            )
          })}
        </FlexContainer>
      )
}


export default Exhibit;