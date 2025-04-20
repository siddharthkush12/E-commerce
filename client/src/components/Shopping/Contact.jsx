import React, { useRef, useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import { FaGithubSquare, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const initialFormData = {
  name: "",
  email: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialFormData);

  const formRef = useRef();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        toast("Message sent successfully");
        setFormData(initialFormData);
        formRef.current.reset();
      })
      .catch((error) => {
        console.error(error);
        toast("Something went wrong");
      });
  }
  return (
    <DialogContent className="w-full md:min-w-[50vw] flex flex-col items-center justify-center overflow-hidden overflow-y-auto h-auto">
      <DialogTitle>About Me</DialogTitle>
      <div className="flex justify-end">
        <div className='flex items-center justify-end gap-4 text-2xl'>
            <a href="https://www.linkedin.com/in/siddharth02022002/" target='_blank' aria-label="LinkedIn">
               <FaLinkedin color='blue'/>
            </a>
            <a href="https://github.com/siddharthkush12" target='_blank' aria-label="GitHub">
               <FaGithubSquare color='black'/>
            </a>
            <a href="https://www.instagram.com/siddharth_kush2002/" target='_blank' aria-label="Instagram">
               <FaInstagram color='orange'/>
            </a>
            <a href="https://x.com/siddharthK0202" target='_blank' aria-label="Twitter">
               <FaXTwitter color='black'/>
            </a>
        </div>
      </div>
      <div className="flex flex-col p-1">
        <div className="flex flex-col items-center justify-center gap-20 md:flex-row">
          <Avatar className="w-50 h-auto">
            <AvatarImage src="/image.png"></AvatarImage>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="text-xl">
              <span className="font-semibold">Name: </span>
              <span>Siddharth Kushwaha</span>
            </div>
            <div className="text-xl">
              <span className="font-semibold">Address: </span>
              <span>Deep Nagar, Jalandhar Cantt, Punjab</span>
            </div>
            <div className="text-xl">
              <span className="font-semibold">Contact: </span>
              <span>7380339254</span>
            </div>
            <div className="text-xl flex">
                <span className="font-semibold">Portfolio: </span>
                <a href="https://portfoliosiddharth.vercel.app/" target="_blank"><img src="/portfolio.png" className="h-10 w-10 cursor-pointer ml-2"/></a>
                <span className="text-base text-muted-foreground">Click to Open</span>
            </div>
          </div>
        </div>
        
      </div>
    </DialogContent>
  );
}

export default Contact;
