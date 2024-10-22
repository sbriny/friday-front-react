
/**
 * SideMenu 3.0
 * 1. 动态路由：react-router-dom 实现路由控制
 * left左侧的ExpandableMenuColumn，点击其出现的Character按钮跳转至Character.js页面；其次，RelativeMenuContainer动态同步出现了为Character.js设置的功能菜单。
 * 
 */

import React, { useEffect, useRef, useState } from 'react';
import {useNavigate, useLocation, Routes, Route} from 'react-router-dom';

import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

import '../assets/style/sidemenu.css';
import overlapImage1 from '../source/home2.png';
import figureType from '../source/clothes-briefs.png';
import clothes from '../source/clothes.png';
import headicon from '../source/1486051942-swiftsocialnetworkbrandlogo_79049.png';
import news from '../source/内参查看.png';
import settings from '../source/setting.png';

import DashBoard from './DashBoard.js';
import Characters from './Characters4.js';
import CharacterMenu from './CharacterMenu2.js';
import Collection from './Collection.js';
import CollectionMenu from './CollectionMenu.js';
import Exhibit from './Exhibit.js';
import ExhibitMenu from './ExhibitMenu.js';

const PageContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
`;

//菜单栏 - 容器
const MenuMiddle = styled.div`
// border: 10px solid #acc;
  z-index: 2000;
  
//   background-color: green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px;

  height: 2.5rem;
  overflow: hidden;
  border-radius: 15px;
`;

//正文 - 内容
const MainContainer = styled.div`
  margin-top: 2.8rem; // 为顶部菜单留出空间
  height: calc(100vh - 2.8rem); // 占据剩余视口高度
  overflow-y: auto; // 允许垂直滚动
`;

// 横向 - 主标题栏延展动画；
const expandEffect = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: calc(100% - 2.8rem);
    opacity: 1;
  }
`;

const MenuItem = styled.div`
// border: 1px solid #abc;
//   position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(151,151,151,0.5);

box-shadow: 0 0px 1rem 0px rgba(12,3,6,.1);
  cursor: pointer;
  background-color: rgb(245,246,249);
  background-image: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
//   z-index: 3;
  border-radius: 1rem;
  margin: 0 .5rem;

  &:hover {
    background-color: rgb(234,235,239);
  }
`;

// 纵向 - 副菜单栏延展容器；
const ExpandEffectColumnMenuContainer = styled.div`
// border: 1px solid #abc;
// position: absolute;
${props=>props.position}: 0;
// top: 0;
z-index: 2001;

display: flex;
flex-direction: column;
jusitify-content: center;
align-item:center;

//元素间距；
gap: .5rem;
`

const ExpandableMenuItem = styled(MenuItem)`
// border: 1px solid #abc;
transition: transform .3s ease-out, opacity 0s ease-out; margin-top .3s ease-out;
opacity: ${props=>props.isVisible?1:0};
transform: scale(${props => props.isVisible ? 1 : 0.1});
margin-top: ${props => props.isVisible ? '0.1rem' : '-2.4rem'}; // 使用 margin-top 来控制显示和隐藏
pointer-events: ${props=>props.isVisible?'auto':'none'};

${props=>props.position}: 0;
`

const Menu = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  margin: .5rem auto;
  width: 100%;

//   border: 2px solid #000;
  z-index: 999;

  display: flex;
  justify-content: space-between;

`;

const SideRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2.9rem;
  display: flex;
  align-items: center;
  border: 1px solid #abc;
`;

const SideLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2.9rem;
  display: flex;
  align-items: center;
  border: 1px solid #abc;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  animation: ${expandEffect} 0.5s ease-out;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-top: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollContent = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const Text = styled.div`
color: #abc;
font-weight: 900;
white-space: nowrap;
display: inline-block; // 改为 inline-block
padding: .25rem 0 .25rem 1rem;
animation: scrollText 60s linear infinite;
@keyframes scrollText {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }


//   background-color: rgba(234,235,239,0.5);
// // padding: 0 10px;
font-size: 1rem;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

/**
 * 功能菜单 - 根据不同页面展示不同的该页面的菜单
 * 例如：Character: Grid, List Menu;
 */
const OtherMenuItemContainer = styled.div`
width: 2.4rem;
height: 2.4rem;
cursor: pointer;
background-color: rgb(245,246,249);
background-size: 70%;
background-repeat: no-repeat;
background-position: center;
z-index: 3;
border-radius: 15px;
margin: .2rem;

&:hover {
  background-color: rgb(234,235,239);
}
`;

const RelativeMenuContainer = styled.div`
// flew-grow: 1;
// border: 3px solid #ace;
// flex-shrink: 0;
// min-width: 200px;
`;

const SystemMenuContainer = styled.div`
height: 100%;
overflow: hidden;
// background-color: #def;
border: 1px solid #ccc;
border-radius: 1rem;
display: flex;
align-items: center;
  flex-grow: 1;
//   border: 3px solid #000;
  width: 100%; // 确保容器有足够的宽度
`;

/**
 * 路由点击器 - 菜单；
 * @param {主要固定菜单按钮；订阅菜单按钮；方向；点击事件} param4 
 * 主要固定按钮：fixed固定在页面顶部菜单栏左右两侧的菜单；左侧固定为主页，右侧固定为系统ICON显示；
 * 订阅菜单按钮：鼠标悬停后出现的其他菜单项；
 * 方向：左侧还是右侧；
 * @returns 
 */
const ExpandableMenuColumn = ({mainIcon, subIcons, position, onItemClick, onMainClick}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
        <ExpandEffectColumnMenuContainer 
      onMouseEnter={() => setIsExpanded(true)} 
      onMouseLeave={() => setIsExpanded(false)} 
      position={position}
    >
      <MenuItem backgroundImage={mainIcon} onClick={onMainClick}/>
      {subIcons.map((item, index) => (
        <ExpandableMenuItem 
          key={index} 
          backgroundImage={item.icon} 
          isVisible={isExpanded} 
          index={index + 1} 
          position={position}
          onClick={() => {
            console.log(`Clicked item ${index}`); // 这行日志；
            onItemClick && onItemClick(item.route);
          }}
        />
      ))}
    </ExpandEffectColumnMenuContainer>
    )
}

/**
 * 顶部菜单栏内容；
 * @param {当前页；设置当前页} param0 
 * @returns 包含：最左右两侧的响应式菜单按钮、中间部分分为两部分：一部分为动态页面（当前页面）的特定的菜单按钮，剩余的留白部分为Scroll Text；
 */
const SideMenu = () => {

    //动态路由；
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => navigate(path);

    //滚动、悬浮状态；
    const scrollRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    //Column的副菜单左右两侧侧所有图标；
    const subMenuItemsLeft=[
        {icon:clothes, route:"/exhibit"}, 
        {icon:news,route:"/"}
    ];
    const subMenuItemsRight=[
        {icon: settings, route:"/"}
    ];

    /**
     * 
     * @returns 动态菜单内容
     */
    const RenderMenuContent=()=>{
        switch(location.pathname){
            case '/character':
                console.log("当前页是/character!");
                return <CharacterMenu/>;
            case '/collection':
                return <CollectionMenu/>;
            default:
                return null;
        }
    }

    return (
        <PageContainer>

            <Menu>

                <ExpandableMenuColumn mainIcon={overlapImage1} subIcons={subMenuItemsLeft} position='left' onMainClick={()=>handleNavigation("/")} onItemClick={(route) => handleNavigation(route)}/>

                <MenuMiddle>
                    <SystemMenuContainer>
                        {/* 系统固定菜单内容 */}
                        <Text>当想清楚为什么要去做并确立意义的那天开始，你的初心就已经存在了，如果能够在人生的路程上继续下去，当走过一段过程后，那么再检视初心，就起到了这个过程的风向标和指路灯的作用了当想清楚为什么要去做并确立意义的那天开始，你的初心就已经存在了，如果能够在人生的路程上继续下去，当走过一段过程后，那么再检视初心，就起到了这个过程的风向标和指路灯的作用了当想清楚为什么要去做并确立意义的那天开始，你的初心就已经存在了，如果能够在人生的路程上继续下去，当走过一段过程后，那么再检视初心，就起到了这个过程的风向标和指路灯的作用了当想清楚为什么要去做并确立意义的那天开始，你的初心就已经存在了，如果能够在人生的路程上继续下去，当走过一段过程后，那么再检视初心，就起到了这个过程的风向标和指路灯的作用了</Text>
                    </SystemMenuContainer>
                    <RelativeMenuContainer>
                        {/* 动态菜单内容 */}
                        {RenderMenuContent()}
                    </RelativeMenuContainer>
                </MenuMiddle>

                <ExpandableMenuColumn mainIcon={headicon} subIcons={subMenuItemsRight} position='right' onMainClick={()=>handleNavigation("/")} onItemClick={(route) => handleNavigation(route)}/>

            </Menu>

            <Main>
                <Routes>
                    <Route path="/" element={<DashBoard/>}/>
                    <Route path="/character" element={<Characters/>}/>
                    <Route path="/collection" element={<Collection/>}/>
                    <Route path="/exhibit" element={<Exhibit/>}/>
                </Routes>
            </Main>

        </PageContainer>
    );
};

export default SideMenu;