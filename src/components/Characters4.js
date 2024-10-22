//Character.js
import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import '../assets/style/font.css';
import AddElementDialog from './CharacterAdd';
import CharacterMenu from './CharacterMenu';
import { useResult } from './Context';
import settings from '../source/setting.png';
import video_icon from '../source/icons/video_recorder.png';
import pictrue_icon from '../source/icons/pic.png';
import axios from 'axios';

//页面网格容器；
const FlexContainer = styled.div`
// border: 1px solid #abc;
margin: 4rem auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: .75rem;
width: 90%;
// max-width: 1200px;
// padding: 1rem;
// box-sizing: border-box;
// overflow: auto;
// overflow-x: hidden;
z-index:999;
@media(max-width: 900px){
    // //grid-template-columns: repeat(2, 1fr);
    // grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
@media(max-width: 500px){
    // grid-template-columns: repeat(2, 1fr));
    // // padding: 0.5rem;
    // gap: .5rem;
}
`;

//通用；
const ItemContainer=styled.div`
height: 7rem;
width: 100%;

// 
@media(max-width: 800px){
    // //height: 200px;
    // height: auto;
    // aspect-ratio: 3/4;
}
@media(max-width: 500px){
    // //height: 310px;
    // height: auto;
    // aspect-ratio: 2/3;
}

// display: none !important;
`;

//二倍体宽度容器；
const WideItem = styled(ItemContainer)`
  grid-column: span 2;

  @media (max-width: 800px) and (min-width: 501px) {
    grid-column: 1/-1;
    height: auto;
    aspect-ratio: 16 / 9; // 这给出了一个宽屏的外观，适合横向内容
  }

  @media (max-width: 500px) {
    grid-column: 1/-1;
    height: 310px;
    width: 100%;
  }
`;

const PicContainer = styled.div`
// border: 1px solid #abc;
//   position: relative;
max-width: 200px;
  height: 100%;
//   overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
//   flex-grow: 1;
  width: 15vw;
//   min-width: 80px;
position: relative;
`;

const PicImage = styled.div`
//   width: 5.25rem;
//   height: 5.25rem;
width: 10vw;
height: 10vw;
max-width: 5.25rem;
max-height: 5.25rem;
  border-radius: 50%;
  background-image: ${props => `url(${props.imgUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 1px 6px 0 rgba(32,33,36,.55);
  z-index: 1;
  &:hover {
    box-shadow: 0 2px 8px 0 rgba(32,33,36,.75);
    transform: scale(2.5);
    box-shadow: 0 4px 12px 0 rgba(32,33,36,.75);
    z-index: 2;
    transition: transform 0.3s ease, box-shadow 0.2s linear;
    border-radius: .25rem;
  }

`;

const IconContainer = styled.div`
display: flex;
// border: 1px solid #ccc;
justify-content: space-between;
`;

const IconContainerLeft = styled.div`
display: flex;
// border: 1px solid #ccc;
`;

const IconContainerRight = styled.div`
// border: 1px solid #ccc;
padding-right: .75rem;

`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 2rem;
`;

const Country = styled.img`
height:.95rem;
border:1px solid #ddf;
border-radius:.35rem;
padding: 1px;
`;

const IconText = styled.span`
font-size:.75rem;line-height:1rem;
border-radius:.25rem;border:1px solid #d0d7de;padding:0 .25rem;text-align:center;width:fit-content;
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
font-weight: 600;
margin-right: .75rem;
`;

const IconTitle = styled.div`
font-size:.75rem;line-height:1rem;color:rgb(8 76 207);
border-radius:.25rem;border:1px solid rgb(8 76 207);padding:0 .25rem;text-align:center;width:fit-content;
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
font-weight: 300;
margin-right: .25rem;
`;

//一倍体宽度容器；
const NormalItem =styled(ItemContainer)`
border: 1px solid rgba(151,151,151,0.5);
border-radius: .375rem;
box-shadow: 0 0px 1rem 0px rgba(12,3,6,.1);
margin: 0 auto;
display:flex;
justify-content: flex-start;
align-items: center;
flex-direction: row;
width: 90%;
max-width: 1200px;
// width: 50vw;
// width: 600px;
`;

//获取图像URL合集函数；
/**
 * 原始image数据，获取原始图片URL数组，这些URL不包含图片的宽度和高度信息；
 * @param {*} r 
 * @returns 
 */
function loadALLImgs(r) {
    return r.keys().map(r);
}

//容器内图像元素；
const Pic=styled.div`
border-radius:15px;
box-shadow: 0 1px 6px 0 rgba(32,33,36,.55);
&:hover{
    box-shadow: 0 2px 8px 0 rgba(32,33,36,.75);
}
width:100%;
height:100%;
// margin: 12px;
margin: 0;
background-image: ${props=>`url(${props.imgUrl})`};
background-repeat: no-repeat;
background-position:center;
background-size: cover;
background-position:0px 0px;
// display: none;
`;

const FigureContainer=styled.div`
flex-grow:3;
display: flex;
flex-direction: column;
justify-content: space-between;
height: 5rem;
width: 10vw;
// border: 1px solid #abc;
// max-width: 5.25rem;
// max-height: 5.25rem;
`;

//容器内标题元素 - 容器；
const FigureInfo=styled.div`
// border: 1px solid #ccc;
display: flex;
flex-column: row;
// width: 50%;
`;

//容器内标题元素 - 标题；
const InfoTitle=styled.span`
// border: 1px solid #ccc;
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
// overflow:hidden;
white-space: nowrap;
text-overflow:ellipsis;
@media(max-width: 500px){
    height: 0.8rem;
}
font-size: 1rem;
padding: 0.5rem 0;
font-weight: bold;
letter-spacing: 1px;
// width: 50%;
`;

const InfoTitleAlias=styled.div`
color: #d0d7de;
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
font-size: 1rem;
padding: 0.5rem 0;
font-weight: bold;
letter-spacing: 1px;
// width: 50%;
// max-width: 600px;
overflow:hidden;
white-space: nowrap;
text-overflow:ellipsis;
`;

/**
 * 姓名 别名
 * 国籍
 * 生日
 * 身高
 */

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
          "/1/1/figure/query",
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
                "/1/1/country/query",{"countryCode":countryCode},
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
            {/* <CharacterMenu></CharacterMenu> */}

            {figures.map(({figureName, figureAlias, figureBornCountry, figureBirth, figureHeight, figureType, figureTag, figureDir, figureFace, figurePoster}, index) => {

                let face = figureFace ? `/media/${figureType}/${encodeURI(figureName)}${figureFace}` : '';
                let poster = figurePoster ? `/media/${figureType}/${encodeURI(figureName)}${figurePoster}` : '';
                let country = `/country/${figureBornCountry}${countryPicBase}.png?raw=true`;

                

                console.log(encodeURI(face));

                //一倍体容器；
                const ItemComponent = NormalItem;

                return (
                    <ItemComponent key={index}>

                        {/* 行内式属性 */}
                        {/* <Pic key={index} styl={{backgroundImage:`url(${item}})`}}></Pic> */}

                        {/* 外联式属性 */}
                        <PicContainer>
                            <PicImage imgUrl={face} />
                        </PicContainer>

                        <FigureContainer>
                            <FigureInfo>
                                <InfoTitle>{figureName}</InfoTitle>
                                <InfoTitleAlias> · {figureAlias}</InfoTitleAlias>
                            </FigureInfo>

                            <IconContainer>
                                <IconContainerLeft>
                                    <IconWrapper>
                                        <IconTitle>video</IconTitle>
                                        <IconText>1</IconText>
                                    </IconWrapper>
                                    <IconWrapper>
                                        <IconTitle>photo</IconTitle>
                                        <IconText>33</IconText>
                                    </IconWrapper>
                                </IconContainerLeft>
                                <IconContainerRight>
                                    <IconWrapper>
                                        <Country src={country} alt="country" />
                                    </IconWrapper>
                                </IconContainerRight>
                            </IconContainer>
                        </FigureContainer>

                    </ItemComponent>
                )

            })}
        </FlexContainer>
        
    )
}


export default Characters;