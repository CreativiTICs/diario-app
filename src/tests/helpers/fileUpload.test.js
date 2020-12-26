import cloudinary from "cloudinary";

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "creativitics",
  api_key: "698834771851191",
  api_secret: "HyPwEs28DMkWRWdagu-Kqyehopc",
});

describe("Pruebas en fileUpload", () => {
  test("Debe cargar un archivo y retornar el url", async (done) => {
    const resp = await fetch(
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
    );
    const blob = await resp.blob();

    const file = new File([blob], "foto.png");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    //Borrar imagen por id
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });

  test("Debe retornar un error", async () => {
    const file = new File([], "foto.png");

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
