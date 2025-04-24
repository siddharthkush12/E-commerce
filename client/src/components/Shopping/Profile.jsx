import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import Form from "../common/Form";
import { profileItemFormControl } from "@/config/formControls";
import { editProfile, fetchProfile } from "@/store/shop/profile-slice";
import { toast } from "sonner";
import AvatarUpload from "./AvatarUpload";
import { FaRegHandPointRight } from "react-icons/fa";

const initialFormData = {
  phone: "",
  gender: "",
  dob: "",
  location: "",
  avatar: "",
};

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [isEditedMode, setIsEditedMode] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const { profileList } = useSelector((state) => state.shopProfile);
  const dispatch = useDispatch();
  const [errorAvatarInUpload, setAvatarErrorInUpload] = useState(false);
  const [avatarUploadUrl, setAvatarUploadUrl] = useState(null);
  const [isAvatarLoading, setAvatarIsLoading] = useState(false);

  // console.log(profileList);

  const profileItem = [
    { label: "Full Name", value: profileList?.fullname },
    { label: "Mobile Number", value: profileList?.phone || "Not Provided" },
    { label: "Email ID", value: profileList?.email },
    { label: "Gender", value: profileList?.gender || "Not Provided" },
    { label: "Date of Birth", value: profileList?.dob || "Not Provided" },
    { label: "Location", value: profileList?.location || "Not Provided" },
  ];

  function handleEditProfile(e) {
    e.preventDefault();
    dispatch(editProfile({ userId: user?.id, formData })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchProfile(user?.id));
        setIsEditedMode(false);
        toast("Profile Updated");
      }
    });
  }

  // console.log(avatarUploadUrl);

  function handleAvtarChange(e) {
    try {
      e.preventDefault();

      if (avatarUploadUrl !== null) {
        const updatedFormData = {
          phone: profileList.phone,
          gender: profileList.gender,
          dob: profileList.dob,
          location: profileList.location,
          avatar: avatarUploadUrl,
        };
        dispatch(
          editProfile({ userId: user?.id, formData: updatedFormData })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchProfile(user?.id));
            setAvatarUploadUrl(null)
          }
        });
      }
    } catch (error) {
      console.log(error);
      setAvatarErrorInUpload(true);
    } finally {
      setAvatarIsLoading(false);
    }
  }

  useEffect(() => {
    dispatch(fetchProfile(user?.id));
  }, [dispatch, user?.id]);

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <div className="flex flex-col items-center justify-center">
          <AvatarUpload
            imageFile={profileList?.avatar}
            setAvatarUploadUrl={setAvatarUploadUrl}
            setErrorInUpload={setAvatarErrorInUpload}
            setAvatarIsLoading={setAvatarIsLoading}
          />
          {isAvatarLoading && <div>Avatar is Loading.....</div>}
          {errorAvatarInUpload && (
            <div>Error in Uploading Avatar. Try again</div>
          )}
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={(e) => handleAvtarChange(e)}
          >
            {avatarUploadUrl === null
              ? "Edit Avatar"
              : <><FaRegHandPointRight />"Click to change Avatar"</>}
          </Button>
        </div>
        <CardTitle className="text-2xl font-semibold text-primary">
          Profile Details
        </CardTitle>
        <Separator className="mt-2" />
      </CardHeader>

      {!isEditedMode ? (
        <CardContent className="space-y-4 text-sm sm:text-base md:text-lg px-2 md:px-4 pb-6">
          {profileItem.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span className="font-medium text-muted-foreground">
                {item.label}
              </span>
              <span className="text-right">{item.value}</span>
            </div>
          ))}
        </CardContent>
      ) : (
        <CardContent className="space-y-4 text-sm sm:text-base md:text-lg px-2 md:px-4 pb-6">
          <Form
            formControls={profileItemFormControl}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Edit Profile"}
            className={"bg-gray-400 w-full"}
            onSubmit={handleEditProfile}
          />
        </CardContent>
      )}

      {!isEditedMode && (
        <CardFooter className="flex items-center justify-center">
          <Button
            className="h-10 w-30 cursor-pointer"
            onClick={() => {
              setIsEditedMode(true);
              setFormData({
                avatar: profileList.avatar,
                phone: profileList.phone,
                gender: profileList.gender,
                dob: profileList.dob,
                location: profileList.location,
              });
            }}
          >
            Edit Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default Profile;


