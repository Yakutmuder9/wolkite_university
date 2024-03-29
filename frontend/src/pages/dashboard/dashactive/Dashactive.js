import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Paper,
    Button,
    IconButton,
    Avatar,
    Card,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormGroup,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import {
    ExpandMore, NotificationsNone
    , MarkChatUnread, DownloadOutlined, Analytics, Stars, Groups, MoreVert, ChevronRight
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import Header from "../../../components/header/Header";

import { useContext, useState } from "react";
import { ColorModeContext } from "../../../theme";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Badge from './Badge';
import CardHeader from '@mui/material/CardHeader';
import { MdLogout } from "react-icons/md";
import { ColGraph, MixedBargraph, Notify, ProgressChart, SpinnChart } from "./SpinnChart";
import { DashCalendar } from "../../calender/DashCalender";


const Dashactive = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const mdScreen = useMediaQuery(theme.breakpoints.up("md"));
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth?.user);
    const [themeToggle, setThemeToggle] = useState(true)
    const [age, setAge] = useState('');

    const toggleStatus = async () => {
        const themeStatus = { featured: themeToggle }
        fetch('http://localhost:5000/api/user/theme', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'patch',
            body: JSON.stringify({ featured: false })
        })
    }



    useEffect(() => {

    }, [dispatch, user])


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className="analytics-activity-dashboard ">
            <Grid container>
                <Grid p="2%" item xs={12} md={8}
                >

                    <Grid display="flex" justifyContent="space-between"
                    >
                        <Header title="Dashboard" subtitle="Welcome to your dashboard" />

                        <Box w={100} display={mdScreen ? "flex" : "none"} alignItems="start">
                            <Box display="flex">
                                <IconButton
                                    onClick={() => {
                                        colorMode.toggleColorMode();
                                        toggleStatus();
                                    }}>

                                    {theme.palette.mode === "dark" ? (

                                        <LightModeOutlinedIcon />
                                    ) : (
                                        <DarkModeOutlinedIcon />
                                    )}
                                </IconButton>
                                <IconButton>
                                    <NotificationsOutlinedIcon />
                                </IconButton>

                                <CardHeader
                                    title={<span>{user?.firstName.replace(/^./, str => str.toUpperCase())}</span>}
                                    subheader={user?.role}
                                    className="p-0 px-2 m-0"
                                />
                                <IconButton
                                    className="py-0 my-0 mx-2">
                                    {user ? <Badge user={user}
                                    /> : <PersonOutlinedIcon />}
                                </IconButton>

                                {broken && rtl && (
                                    <IconButton
                                        sx={{ margin: "0 6 0 2" }}
                                        onClick={() => toggleSidebar()}
                                    >
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>

                    </Grid>

                    <Grid container display="flex" justifyContent="space-between" spacing={2}>
                        <Grid item xs={6} sm={4}>
                            <Card sx={{ height: "70px" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ backgroundColor: colors.blueAccent[100] }}>
                                            <Analytics />
                                        </Avatar>
                                    }
                                    title="Overall Engagment"
                                    subheader="16h / Weekly"
                                />
                            </Card>
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <Card sx={{ height: "70px" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ backgroundColor: colors.blueAccent[100] }}>
                                            <Stars />
                                        </Avatar>
                                    }
                                    title="Point Score"
                                    subheader="568"
                                />
                            </Card>
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <Card sx={{ height: "70px" }}>
                                <CardHeader
                                    avatar={

                                        <Avatar sx={{ backgroundColor: colors.blueAccent[100], fontSize: "60px" }}>
                                            <Groups />
                                        </Avatar>
                                    }
                                    title="Rank Score"
                                    subheader="235"
                                />
                            </Card>
                        </Grid>
                    </Grid>


                    {/* ---- Active hours */}
                    <Grid container display={smScreen ? "flex" : "block"} spacing={1} mt={1}  >
                        <Grid item xs={12} sm={7} >

                            <Box>
                                <Card className="p-3" sx={{ height: '320px', display: "flex", justifyContent: "space-between" }}>
                                    <Box>
                                        Active Hours
                                        <MixedBargraph />
                                        Control Your Activity
                                    </Box>
                                    <Box className=" active-hours-graph-container ">
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">time</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={age}
                                                    label="Age"
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value={10}>Daily</MenuItem>
                                                    <MenuItem value={20}>Weekly</MenuItem>
                                                    <MenuItem value={30}>Monthly</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box className="lisit-active-hours d-flex flex-column justify-content-between  " sx={{ height: "200px" }}>
                                            <Box className="time-spent-card mt-4 ">
                                                <Typography sx={{ fontSize: "10px" }}>Time Spent</Typography>
                                                <Box sx={{ fontSize: "14px" }}>15 <span style={{ fontSize: "9px", background: "#fc08082b", borderRadius: "25%", padding: "2px 8px" }}>73%</span></Box>
                                            </Box>
                                            <Box className="time-spent-card">
                                                <Typography sx={{ fontSize: "10px" }}>Lesson Taken</Typography>
                                                <Box sx={{ fontSize: "14px" }}>23 <span style={{ fontSize: "9px", background: "#f9f1caab", borderRadius: "25%", padding: "2px 8px" }}>83%</span></Box>
                                            </Box>
                                            <Box className="exam-passed-card">
                                                <Typography sx={{ fontSize: "10px" }}>Exam Passed</Typography>
                                                <Box sx={{ fontSize: "14px" }}>12 <span style={{ fontSize: "9px", background: "#caf9e2ab", borderRadius: "25%", padding: "2px 8px" }}>90%</span></Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>

                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Box >
                                <Card className="p-3" sx={{ height: '320px' }}>
                                    Overall Activity

                                    <Paper variant="outlined" className="mt-1" >
                                        <Card>
                                            <CardHeader
                                                title="24.54%"
                                                subheader="Quesions"
                                            />
                                        </Card>
                                    </Paper>

                                    <Paper variant="outlined" className="mt-1" >
                                        <Card>
                                            <CardHeader
                                                title="65.78%"
                                                subheader="Answers"
                                            />
                                        </Card>
                                    </Paper>
                                    
                                    <Paper variant="outlined" className="mt-1" >
                                        <Card>
                                            <CardHeader
                                                title="98.65%"
                                                subheader="Assessments"
                                            />
                                        </Card>
                                    </Paper>
                                </Card>

                            </Box>
                        </Grid>
                    </Grid>

                    {/*------- Enrolled Class */}
                    <Grid container display={smScreen ? "flex" : "block"} spacing={1} mt={1}>

                        <Grid item xs={12} sm={7} >
                            <Box >
                                <Card className="p-3" sx={{ height: '330px' }}>
                                    Enrolled Classes
                                    <CardHeader
                                        sx={{ borderLeft: "5px solid #8A97FB", margin: "10px 2px", padding: "5px 15px" }}
                                        action={
                                            <IconButton aria-label="settings">
                                                <ChevronRight />
                                            </IconButton>
                                        }
                                        title="Fundamental Physics"
                                        subheader="September 14, 2016"
                                    />
                                    <CardHeader
                                        sx={{ borderLeft: "5px solid #D0FB8A", margin: "10px 2px", padding: "5px 15px" }}
                                        action={
                                            <IconButton aria-label="settings">
                                                <ChevronRight />
                                            </IconButton>
                                        }
                                        title="The Laws of Gravity"
                                        subheader="September 14, 2016"
                                    />
                                    <CardHeader
                                        sx={{ borderLeft: "5px solid #FB8AB3", margin: "10px 2px", padding: "5px 15px" }}
                                        action={
                                            <IconButton aria-label="settings">
                                                <ChevronRight />
                                            </IconButton>
                                        }
                                        title="Communication and Speach"
                                        subheader="September 14, 2016"
                                    />
                                    <CardHeader
                                        sx={{ borderLeft: "5px solid #fff123", margin: "10px 2px", padding: "5px 15px" }}
                                        action={
                                            <IconButton aria-label="settings">
                                                <ChevronRight />
                                            </IconButton>
                                        }
                                        title="Motions Dynamics"
                                        subheader="September 14, 2016"
                                    />
                                </Card>


                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <Box >
                                <Card className="p-3" sx={{ height: '240px' }}>
                                    <SpinnChart />
                                </Card>

                            </Box>


                            <Box >
                                <Card className="mt-2 p-2" sx={{ height: '82px' }}>
                                    <CardHeader
                                        avatar={
                                            // <Avatar sx={{ backgroundColor: colors.blueAccent[100] }}>
                                            //     <Analytics />
                                            // </Avatar>
                                            // <div>R</div>
                                            <ProgressChart />
                                        }
                                        title="Overall Engagment"
                                        subheader="16h / Weekly"
                                    />
                                </Card>

                            </Box>
                        </Grid>
                    </Grid>


                </Grid>


                <Grid item xs={12} md={4}
                    sx={{
                        // backgroundColor: colors.blueAccent[100],
                        // backgroundColor: "#99DAFF",
                        color: colors.grey[500],
                        fontSize: "14px",
                        backdropFilter: "blur(8px)",
                        fontWeight: "bold",
                        padding: "10px 2% 10px 0px",
                    }}
                >


                    {/* Analytics searsh and logout button conatiner */}

                    <Grid mb={3} mt={2} xs={12}
                        display={smScreen ? "flex" : "none"} justifyContent="space-between">
                        <Box
                            display="flex"
                            backgroundColor={colors.primary[400]}
                            p={0.2}
                            borderRadius={1}
                        >
                            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
                            <IconButton type="button">
                                <SearchIcon />
                            </IconButton>
                        </Box>
                        <Box>
                            <Button
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.grey[100],
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                }}
                            >
                                <MdLogout sx={{ mr: "10px", me: 2 }} />
                                Log Out
                            </Button>
                        </Box>
                    </Grid>


                    {/* Analytics right side container  */}
                    <Grid container display={mdScreen ? "block" : "flex"} spacing={2}>
                        <Grid item xs={6} md={12}>
                            <Box className="mt-2">
                                <Box>
                                    Calendar
                                </Box>
                                <Card sx={{ height: '320px' }}>
                                    <DashCalendar />
                                </Card>

                            </Box>
                        </Grid>

                        <Grid item xs={6} md={12}>
                            <Box>
                                <Box>
                                    Assignments Due
                                </Box>
                                <Card className="mt-2 px-2 py-2" sx={{ height: '385px' }}>
                                <Paper  variant="outlined" className="my-1 p-1">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked color="success" />} label="Label" />
                                    </FormGroup>
                                </Paper>
                                <Paper  variant="outlined" className="my-1 p-1">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked color="success" />} label="Label" />
                                    </FormGroup>
                                </Paper>
                                <Paper  variant="outlined" className="my-1 p-1">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox  color="success" />} label="Label" />
                                    </FormGroup>
                                </Paper>
                                <Paper  variant="outlined" className="my-1 p-1">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox  color="success" />} label="Label" />
                                    </FormGroup>
                                </Paper>
                                <Paper  variant="outlined" className="my-1 p-1">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox  color="success" />} label="Label" />
                                    </FormGroup>
                                </Paper>
                                <Paper  variant="outlined" className="my-1 p-1">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox  color="success" />} label="Label" />
                                    </FormGroup>
                                </Paper>
                                </Card>

                            </Box>
                        </Grid>

                    </Grid>


                </Grid>
            </Grid>
        </div >

    )
}

export default Dashactive





const Dashactivex = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    return (
        <div>
            {/* <CourseCarosel /> */}
            {/* <Box
                display={smScreen ? "flex" : "block"}
                flexDirection={smScreen ? "row" : "column"}
                justifyContent={smScreen ? "space-between" : "start"}
                alignItems={smScreen ? "center" : "start"}
                m="10px 0"
            >
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box> */}

            {/* GRID & CHARTS */}
            {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                    </Box>
                </Grid>



                <Grid
                    xs={12}
                    sm={12}
                    md={8}
                    lg={8}
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid xs={12}>
                        <Item>
                            <Box backgroundColor={colors.primary[400]}>
                                <Box
                                    mt="25px"
                                    p="15px 30px"
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="600"
                                            color={colors.grey[100]}
                                        >
                                            Revenue Generated
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            fontWeight="600"
                                            color={colors.greenAccent[500]}
                                        >
                                            $58,373,698
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <IconButton>
                                            <DownloadOutlinedIcon
                                                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                            />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Box height="250px" m="-20px 0 0 0">
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid xs={12} sm={12} md={6}><Item>
                        <Box backgroundColor={colors.primary[400]} p="30px">
                            <Typography variant="h5" fontWeight="600">
                                Campaign
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                mt="25px"
                            >
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}
                                    sx={{ mt: "15px" }}
                                >
                                    $48,352 revenue generated
                                </Typography>
                                <Typography>
                                    Includes extra misc expenditures and costs
                                </Typography>
                            </Box>
                        </Box></Item>
                    </Grid>
                    <Grid xs={12} sm={12} md={6}><Item>
                        <Box backgroundColor={colors.primary[400]}>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                sx={{ padding: "30px 30px 0 30px" }}
                            >
                                Sales Quantity
                            </Typography>
                            <Box height="250px" mt="-20px">
                            </Box>
                        </Box></Item>
                    </Grid>
                    <Grid xs={12}><Item>
                        <Box backgroundColor={colors.primary[400]} padding="30px">
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                sx={{ marginBottom: "15px" }}
                            >
                                Geography Based Traffic
                            </Typography>
                            <Box height="200px">
                            </Box>
                        </Box></Item>
                    </Grid>
                </Grid>
                <Grid xs={12} sm={12} md={4} lg={4} xl={4}><Item>
                    <Box
                        backgroundColor={colors.primary[400]}
                        maxHeight="100vh"
                        overflow="auto"
                        m="25px 0 0 0"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            color={colors.grey[100]}
                            p="15px"
                        >
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Resent Transaction
                            </Typography>
                        </Box>
                        {mockTransactions.map((transaction, i) => {
                            return (
                                <Box
                                    key={`${transaction}-${i}`}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    borderBottom={`4px solid ${colors.primary[500]}`}
                                    p="15px"
                                >
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="600"
                                            color={colors.greenAccent[100]}
                                        >
                                            {transaction.txId}
                                        </Typography>
                                        <Typography color={colors.grey[100]}>
                                            {transaction.user}
                                        </Typography>
                                    </Box>
                                    <Box color={colors.grey[100]}>{transaction.date}</Box>
                                    <Box
                                        color={colors.greenAccent[500]}
                                        p="5px 10px"
                                        borderRadius="4px"
                                    >
                                        ${transaction.cost}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box></Item>
                </Grid>
            </Grid> */}
        </div>
    )
}













