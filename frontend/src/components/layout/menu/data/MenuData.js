import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export const menuData = [
  {
    title: 'Trang chủ',
    path: '/admin/home',
    icon: <HomeIcon fontSize='small' />,
  },
  {
    title: 'Thống kê',
    path: '#',
    icon: <DashboardIcon fontSize='small' />,
    iconOpened: <KeyboardArrowDownIcon fontSize='small' />,
    iconClosed: <KeyboardArrowRightIcon fontSize='small' />,
    subMenu: [
      {
        title: 'Mượn nhiều nhất',
        path: '/admin',
        icon: <StarIcon fontSize='small' />,
      },
      {
        title: 'Sinh vien muon nhieu',
        path: '/admin/book-student',
        icon: <AutoStoriesIcon fontSize='small' />,
      },
    ]
  },
  {
    title: 'Quản lý yêu cầu',
    path: '#',
    icon: <ArticleOutlinedIcon fontSize='small' />,
    iconOpened: <KeyboardArrowDownIcon fontSize='small' />,
    iconClosed: <KeyboardArrowRightIcon fontSize='small' />,
    subMenu: [
      {
        title: 'Tạo yêu cầu',
        path: '/admin/request/add_new',
        icon: <NoteAddIcon fontSize='small' />,
      },
      {
        title: 'Yêu cầu mượn',
        path: '/admin/request/borrow',
        icon: <AssignmentTurnedInOutlinedIcon fontSize='small' />,
      },
      {
        title: 'Yêu cầu trả',
        path: '/admin/request/return',
        icon: <AutorenewOutlinedIcon fontSize='small' />,
      },
    ]
  },
  {
    title: 'Quản lý user',
    path: '#',
    icon: <PersonOutlineIcon fontSize='small' />,
    iconOpened: <KeyboardArrowDownIcon fontSize='small' />,
    iconClosed: <KeyboardArrowRightIcon fontSize='small' />,
    subMenu: [
      {
        title: 'Danh sách bạn đọc',
        path: '/admin/user',
        icon: <PeopleAltIcon fontSize='small' />,
      },
      {
        title: 'Danh sách quản trị',
        path: '/admin/admin',
        icon: <PeopleAltIcon fontSize='small' />,
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
        path: '/admin/book/list',
        icon: <LibraryBooksOutlinedIcon fontSize='small' />,
      },
      {
        title: 'Thêm sách',
        path: '/admin/book/add',
        icon: <BookmarkAddOutlinedIcon fontSize='small' />,
      },
    ]
  },
]
