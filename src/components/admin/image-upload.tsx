"use client";

import { useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";

type Props = {};

const ImageUpload = (props: Props) => {
  const [imageURL, setImagenURL] = useState<string>("");
  return (
    <CldUploadWidget
      uploadPreset="quisoco-nextjs"
      options={{ folder: "quisoco-nextjs", maxFiles: 1 }}
      onSuccess={(res, { widget }) => {
        console.log(res);
        if (res.event === "success") {
          // @ts-ignore
          setImagenURL(res.info.secure_url);
          widget.close();
        }
      }}
      onError={(err) => console.error(err)}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label htmlFor="" className="text-slate-800">
              Imagen Producto
            </label>
            <div
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Agregar imagen</p>

              {imageURL && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={imageURL}
                    alt="Imagen Producto"
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="100%"
                  />
                </div>
              )}
            </div>
          </div>
          <input type="hidden" name="image" value={imageURL} />
        </>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
