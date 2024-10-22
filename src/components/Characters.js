//Character.js
import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import '../assets/style/font.css';
import AddElementDialog from './CharacterAdd';
import CharacterMenu from './CharacterMenu';
import { useResult } from './Context';

//页面网格容器；
const FlexContainer = styled.div`
display: grid;
//grid-template-columns: repeat(5,1);
grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
// grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
// grid-template-columns: repeat(auto-fit, clamp(180px, 20vw, 300px));
// grid-auto-rows: 16rem;
grid-auto-flow: dense;
gap: 1rem;
justify-content: center;
width: 100%;
max-width:100%;
padding: 1rem;
box-sizing: border-box;
overflow: auto;
overflow-x: hidden;
z-index:999;
@media(max-width: 900px){
    //grid-template-columns: repeat(2, 1fr);
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
@media(max-width: 500px){
    grid-template-columns: repeat(2, 1fr));
    // padding: 0.5rem;
    gap: 0.5rem;
}
`;

//Normal容器；
const Item=styled.div`
// width: 10rem;
height: 20rem;
// border: 1px solid #abc;
// margin: 12px;
// margin-right:10px;
// margin-bottom:10px;
// margin-bottom:1rem;
// &:last-child{
//     margin-right:auto;
// }
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
@media(max-width: 800px){
    //height: 200px;
    height: auto;
    aspect-ratio: 3/4;
}
@media(max-width: 500px){
    //height: 310px;
    height: auto;
    aspect-ratio: 2/3;
}

// display: none !important;
`;

//二倍体宽度容器；
const WideItem = styled(Item)`
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

//一倍体宽度容器；
const NormalItem =styled(Item)`grid-column:span 1;`;

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
// border:1px solid #acc;
width:100%;
height:100%;
// margin: 12px;
margin: 0;
background-image: ${props=>`url(${props.imgUrl})`};
background-repeat: no-repeat;
background-position:center;
background-size: cover;
background-position:0px 0px;    
`;

//容器内标题元素；
const Title=styled.div`
width:150px;
height: 10%;
// flex-grow:1;
// border:1px solid #acc;
display: block;
text-align:center;
color: #000;
font-weight:500;
overflow:hidden;
white-space: nowrap;
text-overflow:ellipsis;
@media(max-width: 500px){
    height: 0.8rem;
}
font-size: 1.0rem;
padding: 0.5rem 0;
// font-family: 'stixm', sans-serif;
font-family: Arial,sans-serif;
// letter-spacing: 1px;
`;

const Characters = () =>{

    const {result, setResult} = useResult();

    //图像路径地址集合；
    const [imageUrlsMap, setImageUrlsMap] = useState([]);

    useEffect(() => {
    const urls = loadALLImgs(require.context('../source', false, /\.(png|jpe?g|svg|jfif)$/));
    setImageUrlsMap(urls);
    }, []);

    useEffect(() => {
    setResult(preResult => ({
        ...preResult,
        imageUrlsMap: imageUrlsMap
    }));
    }, [imageUrlsMap, setResult]);
    
    //图像数据集合；
    //返回包含[当前状态值, 更新这个状态的函数]的数组；
    const [pic, setImageData] = useState([]);
    
    useEffect(()=>{

        Promise.all(imageUrlsMap.map(path=>
            new Promise((resolve)=>{
                const img=new Image();
                img.onload=()=>resolve({path, width:img.width, height:img.height});
                img.src=path;
            })
        )).then(data=>{
            setImageData(data);
        });
    },[imageUrlsMap]);
    
    return (
        <FlexContainer>
            {/* <AddElementDialog></AddElementDialog> */}
            <CharacterMenu></CharacterMenu>

            {pic.map(({path, width, height}, index) => {
                const ItemComponent = width > height ? WideItem : NormalItem;
                return (
                    <ItemComponent key={index}>

                        {/* 行内式属性 */}
                        {/* <Pic key={index} styl={{backgroundImage:`url(${item}})`}}></Pic> */}

                        {/* 外联式属性 */}
                        <Pic imgUrl={path}></Pic>

                        <Title>{path}</Title>

                    </ItemComponent>
                )

            })}
        </FlexContainer>
        
    )
}


export default Characters;