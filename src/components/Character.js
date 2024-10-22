/**
 * Character - Grid
 */

import React, {useEffect, useState} from 'react';

import axios from 'axios';

import styled from '@emotion/styled';
import '../assets/style/font.css';
import settings from '../source/setting.png';
import video_icon from '../source/icons/video_recorder.png';
import pictrue_icon from '../source/icons/pic.png';

import AddElementDialog from './CharacterAdd';
import CharacterCount from './CharacterMenu';
import { useResult } from './Context';

//页面网格容器；
const FlexContainer = styled.div`
margin: 1rem auto;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
grid-auto-flow: dense;
gap: 2.5rem;
justify-content: center;
width: 90%;
@media(max-width: 900px){
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
@media(max-width: 500px){
    grid-template-columns: repeat(2, 1fr));
}
`;

//Normal容器；
const Item=styled.div`
height: 35rem;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
@media(max-width: 800px){
    height: auto;
    aspect-ratio: 3/4;
}
@media(max-width: 500px){
    height: auto;
    aspect-ratio: 2/3;
}
`;

const PicContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: .75rem;
  `;
  
  const PicImage = styled.div`
  box-shadow: 0 1px 6px 0 rgba(32,33,36,.55);
  border-radius: .75rem;
  width: 100%;
  height: 100%;
  background-image: ${props => `url(${props.imgUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 1;
  &:hover {
    box-shadow: 0 2px 8px 0 rgba(32,33,36,.75);
    transition: transform 0.3s ease, box-shadow 0.2s linear;
    transform: scale(1.2);
    box-shadow: 0 4px 12px 0 rgba(32,33,36,.75);
    z-index: 2;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: .5rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const IconText = styled.span`
  margin-left: 5px;
  color: white;
  font-size: 12px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
`;

//一倍体宽度容器；
const NormalItem =styled(Item)`
`;

//容器内标题元素 - 容器；
const FigureInfo=styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 100%;
`;

//容器内标题元素 - 标题；
const InfoTitle=styled.div`
display: block;
text-align:center;
color: #000;
font-weight:500;
white-space: nowrap;
text-overflow:ellipsis;
@media(max-width: 500px){
    height: 0.8rem;
}
font-size: 1.25rem;
padding: 0.5rem 0;
font-family: stixg;
`;

const Characters = () => {
    const [figures, setFigures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countryIcon, setCountryIcon] = useState("");
  
    useEffect(() => {
      queryFigures();
    }, []);
  
    const queryFigures = async () => {
      try {
        const response = await axios.post(
          "/friday/figure/query",
          {},
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        const responseFigureList=response.data.data.records;
        setFigures(responseFigureList);
        setLoading(false);

        // Fetch country for all Unique countries;
        const uniqueCountryList = [...new Set(responseFigureList.map(f => f.figureBornCountry))];

        // 并行获取国家图标路径
        const countryIcons = await Promise.all(uniqueCountryList.map(country => {
          return queryCountryPath(country);
        }));
        setCountryIcon(Object.fromEntries(countryIcons));
      } catch (error) {
        console.log("axios request fail", error);
        setLoading(false);
      }
    };

    //查询国家图标；
    const queryCountryPath=async(countryCode)=>{
        try{
            const response =
            await axios.post(
                "/friday/country/query",{"countryCode":countryCode},
                {headers:{'Content-Type':'application/json'}});
            return [countryCode, response.data.data.countryPic];
        }
        catch(error){
            console.log("query country icon path faild!");
            return [countryCode, null];
        }
    };

    if(loading===true) return <div>isLoading...</div>

    const countryPicBase='@3x';

    return (
        <FlexContainer>
            {/* <AddElementDialog></AddElementDialog> */}
            <CharacterCount></CharacterCount>

            {figures.map(({figureName, figureAlias, figureBornCountry, figureBirth, figureHeight, figureType, figureTag, figureDir, figureFace, figurePoster}, index) => {

                let face = figureFace ? `/media/${encodeURI(figureName)}${figureFace}` : '';;
                // let poster = figurePoster ? `/media/${figureType}/${encodeURI(figureName)}${figurePoster}` : '';
                let poster = figurePoster ? `/media/${figureType}/${encodeURI(figureName)}${figurePoster}?v=${Date.now()}` : '';
                let country = `/country/${figureBornCountry}${countryPicBase}.png?raw=true`;

                console.log(encodeURI(poster));

                //一倍体容器；
                const ItemComponent = NormalItem;

                

                return (
                    <ItemComponent key={index}>

                        {/* 行内式属性 */}
                        {/* <Pic key={index} styl={{backgroundImage:`url(${item}})`}}></Pic> */}

                        {/* 外联式属性 */}
                        <PicContainer>
                            <PicImage imgUrl={poster} />
                            <IconContainer>
                                <IconWrapper>
                                    <Icon src={video_icon} alt="video" />
                                    <IconText>1</IconText>
                                </IconWrapper>
                                <IconWrapper>
                                    <Icon src={pictrue_icon} alt="picture" />
                                    <IconText>33</IconText>
                                </IconWrapper>
                                {/* <IconWrapper>
                                    <Icon src={country} alt="country" />
                                </IconWrapper> */}
                            </IconContainer>
                        </PicContainer>

                        <FigureInfo>
                            <InfoTitle>{figureName}</InfoTitle>
                        </FigureInfo>

                    </ItemComponent>
                )

            })}
        </FlexContainer>
        
    )
}


export default Characters;