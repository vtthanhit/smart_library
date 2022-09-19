import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

export const userMenuData = [
  {
    title: 'Trang chủ',
    path: '/index',
    icon: <DashboardIcon fontSize='small' />,
  },
  {
    title: 'Quản lý yêu cầu',
    path: '#',
    icon: <ArticleOutlinedIcon fontSize='small' />,
    iconOpened: <KeyboardArrowDownIcon fontSize='small' />,
    iconClosed: <KeyboardArrowRightIcon fontSize='small' />,
    subMenu: [
      {
        title: 'Yêu cầu mượn',
        path: '/borrow',
        icon: <AssignmentTurnedInOutlinedIcon fontSize='small' />,
      },
      {
        title: 'Yêu cầu trả',
        path: '/return',
        icon: <AutorenewOutlinedIcon fontSize='small' />,
      },
    ]
  },
]
