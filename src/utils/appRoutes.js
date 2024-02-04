import {
    CreateIdea,
    ReviewIdeas,
    ViewIdea,
    MyIdeas,
    Home
} from "../pages";
import {
    FormOutlined,
    UnorderedListOutlined,
    EyeOutlined,
    HomeOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

export const appRoutes = [
    { isMenuItem: true, path: "/", label: 'Home', element: <Home />, isProtected: false, icon: <HomeOutlined /> },
    { isMenuItem: true, path: "/myideas", label: 'My Ideas', element: <MyIdeas />, isProtected: true, icon: <UnorderedListOutlined /> },
    { isMenuItem: true, path: "/createidea", label: 'Create Idea', element: <CreateIdea />, isProtected: true, icon: <FormOutlined /> },
    { isMenuItem: true, path: "/reviewideas", label: 'Review Ideas', element: <ReviewIdeas />, isProtected: true, icon: <CheckCircleOutlined /> },
    { isMenuItem: false, path: "/viewidea", label: 'View Idea', element: <ViewIdea />, isProtected: true, icon: <EyeOutlined /> }
]