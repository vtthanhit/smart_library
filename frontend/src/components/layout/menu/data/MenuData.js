import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

export const menuData = [
  {
    title: 'Thống kê',
    path: '/admin',
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
        path: '/request/aaaa',
        icon: <AssignmentTurnedInOutlinedIcon fontSize='small' />,
      },
      {
        title: 'Yêu cầu trả',
        path: '/request/bbbb',
        icon: <AutorenewOutlinedIcon fontSize='small' />,
      },
    ]
  },
  {
    title: 'Quản lý bạn đọc',
    path: '#',
    icon: <PersonOutlineIcon fontSize='small' />,
    iconOpened: <KeyboardArrowDownIcon fontSize='small' />,
    iconClosed: <KeyboardArrowRightIcon fontSize='small' />,
    subMenu: [
      {
        title: 'Danh sách bạn đọc',
        path: '/student/list',
        icon: <PeopleAltIcon fontSize='small' />,
      },
      {
        title: 'Thêm bạn đọc',
        path: '/student/add',
        icon: <PersonAddIcon fontSize='small' />,
      },
    ]
  },
  {
    title: 'Quản lý danh mục',
    path: '#',
    icon: <CategoryOutlinedIcon fontSize='small' />,
    iconOpened: <KeyboardArrowDownIcon fontSize='small' />,
    iconClosed: <KeyboardArrowRightIcon fontSize='small' />,
    subMenu: [
      {
        title: 'Danh sách danh mục',
        path: '/admin/category',
        icon: <AssignmentOutlinedIcon fontSize='small' />,
      },
    ]
  },
  {
    title: 'Quản lý sách',
    path: '#',
    icon: <ImportContactsOutlinedIcon fontSize='small' />,
    iconOpened: <KeyboardArrowDownIcon fontSize='small' />,
    iconClosed: <KeyboardArrowRightIcon fontSize='small' />,
    subMenu: [
      {
        title: 'Danh sách sách',
        path: '/book/list',
        icon: <LibraryBooksOutlinedIcon fontSize='small' />,
      },
      {
        title: 'Thêm sách',
        path: '/book/add',
        icon: <BookmarkAddOutlinedIcon fontSize='small' />,
      },
    ]
  },
]
