import { useState } from "react"
import { Box, IconButton, InputBase, Select, MenuItem, FormControl, useTheme, useMediaQuery, Typography } from "@mui/material"
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "../state"
import { useNavigate } from "react-router-dom"
import FlexBetween from "../components/FlexBetween"

const Navbar = ({title}) => {

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)")
  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  // const primary = theme.palette.primary
  const primaryLight = theme.palette.primary.light
  const alt = theme.palette.background.alt

  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Log In';
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap={"1.75rem"}>
      <Typography>
        <h1 className={`${theme.palette.mode === "dark" ? "bg-dark": "bg-light"}`}
          style={{
            margin: 0,
          }}
          onClick={() => navigate("/home")}
        >{title}</h1>
        </Typography>

        {/* For small screens */}
        {isNotMobileScreen && (
          <FlexBetween padding="0.1rem 1.5rem" backgroundColor={neutralLight}
            borderRadius={".5rem"} gap={"3rem"}>
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* For Desktops */}
      {isNotMobileScreen ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ?
              <DarkMode sx={{ fontSize: "25px" }} />
              :
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            }
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard"
            value={fullName} >
            <Select value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: ".25rem",
                p: ".25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: ".25rem",
                  width: "3rem"
                },
                "& .muiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setLogout())
                  navigate("/")
                }}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>)
        :
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      }

      {/* Mobile Nav */}
      {!isNotMobileScreen && isMobileMenuToggled && (
        <Box position={"fixed"}
          right={"0"} bottom={"0"}
          height={"100%"} zIndex={10}
          maxWidth={"500px"} minWidth={"300px"}
          backgroundColor={background}>
          <Box display={"flex"} justifyContent={"flex-end"} p={"1rem"}>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <FlexBetween gap="2rem" display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ?
                <DarkMode sx={{ fontSize: "25px" }} />
                :
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              }
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard"
              value={fullName} >
              <Select value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: ".25rem",
                  p: ".25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: ".25rem",
                    width: "3rem"
                  },
                  "& .muiSelect-select:focus": {
                    backgroundColor: neutralLight
                  }
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}
export default Navbar