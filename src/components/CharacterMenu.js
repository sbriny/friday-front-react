import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/styled';
import RSSTimeline from './RSSTimeline';
import PhotoSphere from './PhotoSphere';
import RotatingEarth from './RotatingEarth';

// 导入本地图片
// import networkAssetIcon from '../assets/pic/资产.png';
// import myCharacterIcon from '../assets/pic/p1.png';
// import timelineIcon from '../assets/pic/news.png';
// import { PropertyMixer } from 'three';
import Subtraction from '../assets/pic/sub.png';
import Addition from '../assets/pic/add.png';

const MenuContainer = styled.div`
//  border: 3px solid ${props => props.theme.primary};
//  border-radius:1.5rem;
 width: 100vw;
 left: 0;
 right: 0;
 margin-left:auto;
 margin-right:auto;
 margin-bottom:1.8rem;
 bottom: 0;
 //background-color: ${props => props.theme.background};
 color: ${props => props.theme.text};
 position: fixed;
 display: flex;
 justify-content:center;
 flex-direction:row;
z-index:1000;
transition: transform .3s ease-in-out;
transform: ${props=>props.hidden?'translateY(0)':'translateY(150%)'};
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
    background-color: ${props => props.theme.primary};
    color: #ffffff;
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
// display:flex;
// justify-content:center;
// align-items:center;
// color: #abc;
// width: 30px;
// @media(max-width: 768px){
//     display: none;
// }
// border: 1px solid #abc;
width: 55vw;
`;

const MenuItem = styled.div`
// border: 1px solid #abc;
display: flex;
justify-content:center;
align-items:center;
padding: 10px;
background-color: #f5f5f7;
box-shadow: 0 1px 6px 0 rgba(32,33,36,.55);
border-radius: 1.5rem;
transition: all .3s ease-in-out;
transition-delay: .1s;
&:first-of-type{
    transform:${props=>props.hidden?'translateX(100%)':'translateX(-30%)'};
}
&:last-of-type{
    transform:${props=>props.hidden?'translateX(-100%)':'translateX(30%)'};
}
@media(max-width:1068px){
    &:hover {
        background-color: #def;
    }
}
`;

const MenuIcon=styled.img`
// border: 1px solid #abc;
// padding: .3rem;
height:1.5rem;
width: 1.5rem;
border-radius: 1.5rem;
// @media(max-width:1068px){
//     height:1.5rem;
//     width: 1.5rem
//     padding: 3rem;
//     &:hover {
//         // background-color: ${props => props.theme.primary};
//         background-color: #def;
//         // padding:0.5rem .5rem 0.5rem .5rem;
//         // color: #ffffff;
//         transition: all .3s ease-in-out;
//     }
//     &:not(:hover){
//         transition: all .3s ease-out;
//     }
// }
`;

const CharacterMenu = () => {

    const[isVisible, setIsVisible]=useState(true);
    const[lastScrollY, setLastScrollY]=useState(0);
    const[isMobile,setIsMobile]=useState(window.innerWidth<=768);

    useEffect(()=>{
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
            if(window.innerWidth>768){}
            setIsVisible(true);
        }

        if(isMobile){
            window.addEventListener('scroll',handleScroll);
        }
            window.addEventListener('resize',handleResize);

            return()=>{
                window.removeEventListener('scroll',controlNavbar);
                window.removeEventListener('resize',handleResize);
            };
    
    }, [lastScrollY, isMobile]);


return (
<MenuContainer style={{transform:isVisible?'translateY(0)':'translateY(200%)'}}>
    <MenuItem hidden={!isVisible}>
        <MenuIcon src={Addition} alt="networkAss"></MenuIcon>
        <MenuText>add</MenuText>
    </MenuItem>
    <Separator></Separator>
    <MenuItem hidden={!isVisible}>
        <MenuIcon src={Subtraction} alt="timeline"></  MenuIcon>
        <MenuText>del</MenuText>
    </MenuItem>
</MenuContainer>
  );
};

export default CharacterMenu;
