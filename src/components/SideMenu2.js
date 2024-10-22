//SideMenu2.js
import React, {useMemo, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/styled';
import RSSTimeline from './RSSTimeline';
import PhotoSphere from './PhotoSphere';
import RotatingEarth from './RotatingEarth';
import { useResult } from './Context';

// 导入本地图片
import networkAssetIcon from '../assets/pic/资产.png';
import myCharacterIcon from '../assets/pic/p1.png';
import timelineIcon from '../assets/pic/news.png';
import { PropertyMixer } from 'three';

const MenuContainer = styled.div`
//  border: 3px solid ${props => props.theme.primary};
 border-radius:1.5rem;
 width: 70vw;
 left: 0;
 right: 0;
 margin-left:auto;
 margin-right:auto;
 margin-bottom:1.8rem;
 bottom: 0;
 //background-color: ${props => props.theme.background};
 background-color: #f5f5f7;
 color: ${props => props.theme.text};
 position: fixed;
 display: flex;
 flex-direction:row;
 justify-content: space-between;
 min-width: 200px;
 max-width: 900px;
 @media(max-width:1068px){
    width: 50%;
    border-radius: 2rem;
}
z-index:1001;
transition: transform .3s ease-in-out;
transition-delay: .1s;
transform: ${props=>props.hidden?'translateY(0)':'translateY(150%)'};
box-shadow: 0 1px 6px 0 rgba(32,33,36,.55);
 `;
 
const MenuText = styled.div`
transition: all .3s ease-in-out;
// border: 1px solid #abc;
// flex-grow:3;
padding: 5px;
cursor: pointer;
font-size: 1rem;
text-align:center;
font-weight: 500;
//   line-height: 5rem;
border-radius: 1rem;
margin-left: .5rem;
width: 40%;
// margin: 10px;
&:hover {
    //background-color: ${props => props.theme.primary};
    // color: #ffffff;
    background-color: #def;
}
// min-width: 100px;
overflow: hidden;
color: #6199F8;
text-wrap: nowrap;
text-overflow: ellipise;
@media(max-width:1068px){
    display: none;
}
`;

const Separator = styled.div`
display:flex;
justify-content:center;
align-items:center;
color: #abc;
width: 30px;
@media(max-width: 1068px){
    display: none;
}
`;

const MenuItem = styled.div`
// border: 1px solid #abc;
display: flex;
justify-content:center;
// justify-content: flex-start;
width: 100%;
align-items:center;
padding: 10px;
@media(max-width:1068px){
    &:hover{
        background-color: #def;
    }
}
// position: relative;
border-radius: 1.5rem;
overflow:hidden;
transition: all .3s ease-in-out;
`;

const MenuIcon=styled.img`
// border: 1px solid #abc;
// padding: .3rem;
height:1.5rem;
width: 1.5rem;
transition: opacity .5s ease-in-out, transform .5s ease-in-out;
opacity: ${props=> props.isLoaded?0:1};
transform: ${props=> props.isLoaded?'scale(0.5)':'scale(1)'};
position: ${props=> props.isLoaded?'absolute':'relative'};
@media(max-width:1068px){
    height:1.5rem;
    width: 1.5rem
    // padding: 2rem;
    border-radius: 15px;
    padding: 0rem 1.5rem 0rem 1.5rem;
    &:hover {
        background-color: #def;
        transition: all 0.3s ease-in-out;
      }
      
      &:not(:hover) {
        transition: all 0.3s ease-out;
      }
}
`;

const Count=styled.div`
    color: #6199F8 !important;
    font-weight: bold;
    opacity: ${props => props.isLoaded ? 1 : 0};
    transform: ${props => props.isLoaded ? 'scale(1)' : 'scale(0.5)'};
    transition: opacity .3s ease-in-out, transform .3s ease-in-out;
    transition-delay: .3s;
    font-size: 1rem;
    margin-left: 0.5rem;
    
`;

const SideMenu = () => {

    //访问状态；
    const[isVisible, setIsVisible]=useState(true);
    //滚动状态；
    const[lastScrollY, setLastScrollY]=useState(0);
    //移动端状态；
    const[isMobile,setIsMobile]=useState(window.innerWidth<=768);
    //图像对象数量；
    const[imageCount, setImageCount]=useState(0);
    //加载状态 -> 加载完成后，菜单栏图标替换为统计数量；
    const[isLoaded, setIsLoaded]=useState(false);

    const { result } = useResult();
    const {imageUrlsMap, selectedImage, filterCriteria, currentPage} = result;
    
    //记忆图像对象的数量；
    const count = useMemo(() => result.imageUrlsMap ? Object.keys(result.imageUrlsMap).length : 0,[imageUrlsMap]);

    //加载状态监测；
    useEffect(()=>{
        if(imageUrlsMap && Object.keys(imageUrlsMap).length>0){
            setIsLoaded(true);
        }
    },[imageUrlsMap]);

    useEffect(()=>{
        
        console.log('Result in SideMenu:', result); // 添加这行来调试

        console.log('image count is',Object.keys(count).length);
        setImageCount(count);

        const controlNavbar=()=>{
            //if(typeof window !=='undefined'){
            if(window.innerWidth<=768){
                const currentY=window.scrollY;
                const threshold=200;
                if(currentY>lastScrollY+threshold){
                    setIsVisible(false);
                }
                else if(currentY<lastScrollY-threshold){
                    setIsVisible(true);
                }
                setLastScrollY(currentY);
            }
        };

        const handleScroll = () =>{
            window.requestAnimationFrame(controlNavbar);
        };

        const handleResize=()=>{
            setIsMobile(window.innerWidth<=768);
            if(window.innerWidth>768){
                setIsVisible(true);
            }
        }

        if(isMobile){
            window.addEventListener('scroll',handleScroll);
        }
            window.addEventListener('resize',handleResize);

            return()=>{
                window.removeEventListener('scroll',controlNavbar);
                window.removeEventListener('resize',handleResize);
            };
    
    }, [lastScrollY, isMobile, result.imageUrlsMap]);


return (
<MenuContainer style={{transform: isVisible ? 'translateY(0)' : 'translateY(200%)'}}>
{/* <MenuContainer style={{transform:isVisible?'translateY(0)':'translateY(200%)'}}> */}
    <MenuItem>
        <MenuIcon src={networkAssetIcon} alt="networkAss"></MenuIcon>
        <MenuText>网络资产</MenuText>
    </MenuItem>
    <Separator>|</Separator>
    <MenuItem>
        <MenuIcon src={myCharacterIcon} alt="personal" isLoaded={isLoaded}/>
        <Count isLoaded={isLoaded}>{count}</Count>
        <MenuText>
            我的人物
            {/* {result.imageUrlsMap ? Object.keys(result.imageUrlsMap).length : 0} */}
        </MenuText>
    </MenuItem>
    <Separator>|</Separator>
    <MenuItem>
        <MenuIcon src={timelineIcon} alt="timeline"></  MenuIcon>
        <MenuText>数据时间线</MenuText>
    </MenuItem>
</MenuContainer>
  );
};

export default SideMenu;
