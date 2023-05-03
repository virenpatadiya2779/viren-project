import {useEffect, useRef} from "react";

const UploadWidget = ({childToParent}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dqgo5axpw",
            uploadPreset: "skHomeIndustryProducts",
            maxFiles: 1
            
        }, (error, result) => { 
            if (!error && result && result.event === "success") { 
              console.log('Done! Here is the image info: ', result.info.secure_url);
              childToParent(result.info.secure_url) 
            }
          })
    }, [])
    return(
        <>
            <button onClick={() => widgetRef.current.open()} className="form-control1 mt-3">
                Upload Image
            </button>
        </>
    )
}

export default UploadWidget