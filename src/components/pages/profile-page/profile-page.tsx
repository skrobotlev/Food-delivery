import React from "react";
import styled from "styled-components";
import {
  EditProfileIconSvg,
  LogOutIconSvg,
  RenewPlansIconSvg,
  SettingsIconSvg,
  TermsAndPrivPolIconSvg,
} from "../../buttons/icons/profile-menu-icons/icons";
import Layout from "../layout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ProfilePageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  font-family: "Signika";
  /* h1 {
    font-size: 16px;
  }
  h2 {
    font-size: 25px;
  }
  h3 {
    color: #a1a1a1;
    font-weight: 400;
    font-size: 16px;
  } */
`;

const ProfilePhotoDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 160px;
  height: 160px;
  border-radius: 100px;
  img {
    width: 160px;
    height: 160px;
    border-radius: 100px;
  }
`;

const ProfilePageMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* align-items: center; */
`;

const ProfilePageMenuH4 = styled.div`
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  width: 295px;
  i {
    padding-left: 100px;
    display: flex;
    justify-content: flex-end;
  }
`;

const ProfileMenuIcons = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
  /* justify-content: flex-start; */
`;

const ProfileMenuHeaders = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 17px;
line-height: 30px;
  }
  
`;



const ProfilePage = () => {
  const headers = ["Edit Profile", "Renew Plans", "Settings", "Terms & Privacy Policy", "Log Out"];
  const arrIconsMenu = [<EditProfileIconSvg />,
  <RenewPlansIconSvg />,
  <SettingsIconSvg />,
  <TermsAndPrivPolIconSvg />,
  <LogOutIconSvg />];

  const headersAndIcons = [
    {
      title: "Edit Profile",
      icon: <EditProfileIconSvg />,
      arrow: <ArrowForwardIosIcon fontSize="small" />
    },
    {
      title: "Renew Plans",
      icon: <RenewPlansIconSvg />,
      arrow: <ArrowForwardIosIcon fontSize="small" />
    },
    {
      title: "Settings",
      icon: <SettingsIconSvg />,
      arrow: <ArrowForwardIosIcon fontSize="small" />
    },
    {
      title: "Terms & Privacy Policy",
      icon: <TermsAndPrivPolIconSvg />,
      arrow: <ArrowForwardIosIcon fontSize="small" />
    },
    {
      title: "Log Out",
      icon: <LogOutIconSvg />,
      arrow: <ArrowForwardIosIcon fontSize="small" />
    },
  ];
  return (
    <ProfilePageDiv>
      <h1>Profile</h1>
      <ProfilePhotoDiv>
        <img src="https://static.wixstatic.com/media/a27d24_ae7df0679e2743d295b589eacf80c605~mv2.jpg/v1/fill/w_480,h_320,al_c,q_90/a27d24_ae7df0679e2743d295b589eacf80c605~mv2.jpg"></img>
      </ProfilePhotoDiv>
      <h2>Shambhavi Mishra</h2>
      <h3>Food blogger</h3>
      <ProfilePageMenu>
        {/* <ProfileMenuIcons>
          <EditProfileIconSvg />
          <RenewPlansIconSvg />
          <SettingsIconSvg />
          <TermsAndPrivPolIconSvg />
          <LogOutIconSvg />
        </ProfileMenuIcons> */}
        <ProfileMenuHeaders>
          {headersAndIcons.map((item) => (
            <ProfilePageMenuH4>
              <ProfileMenuIcons>
                {item.icon}
              </ProfileMenuIcons>
              {item.title}
              <i> <ArrowForwardIosIcon fontSize="small" /></i>
            </ProfilePageMenuH4>
          ))}
        </ProfileMenuHeaders>
        {/* <ProfilePageMenuH4>
                    <EditProfileIconSvg />
                    Edit profile
                    <i> <ArrowForwardIosIcon fontSize="small" /></i>
                </ProfilePageMenuH4> */}
      </ProfilePageMenu>
      <Layout />
    </ProfilePageDiv>
  );
};

export default ProfilePage;
