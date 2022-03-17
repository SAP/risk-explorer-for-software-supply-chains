import React from 'react'
import * as GrIcons from 'react-icons/gr'
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'
import CodeIcon from '@mui/icons-material/Code';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'sidebarListItem menu-item'
    },
   
    
]

export const SidebarDataAttack = [
    {
        title: 'Attack Tree',
        path: '/attacktree',
        icon: <GrIcons.GrTree/>,
        cName: 'sidebarListItem menu-item'
    },
    {
        title: 'Attack Vectors',
        path: '/attackvectors',
        icon: <AiIcons.AiTwotoneBug/>,
        cName: 'sidebarListItem menu-item'
    }
]

export const SidebarDataBottom = [
    {
        title: 'References',
        path: '/references',
        icon: <BiIcons.BiNews/>,
        cName: 'sidebarListItem menu-item'
    },
    {
        title: 'Safeguards',
        path: '/safeguards',
        icon: <AiIcons.AiOutlineSafety/>,
        cName: 'sidebarListItem menu-item'
    }
]

export const SidebarDataDocumentation = [
    
    {
        title: 'OSS Supply Chain Model',
        path: '/documentation',
        hash:'#oss-supp-model',
        icon: <ArchitectureIcon/>,
        cName: 'sidebarListItem menu-item'
    },
    {
        title: 'Attack Tree Fundamentals',
        path: '/documentation',
        hash:'#attacktree-fund',
        icon: <AccountTreeIcon/>,
        cName: 'sidebarListItem menu-item'
    },
    {
        title: 'JSON Data Structure',
        path: '/documentation',
        hash:'#jsondata',
        icon: <CodeIcon></CodeIcon>,
        cName: 'sidebarListItem menu-item'
    }

]