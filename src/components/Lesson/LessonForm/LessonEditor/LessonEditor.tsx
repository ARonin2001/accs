import { IAllProps } from "@tinymce/tinymce-react";
import { FC } from "react";
import { BundledEditor } from "../../../BundledEditor/BundledEditor";

interface LessonEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  height?: number;
}

export const LessonEditor: FC<LessonEditorProps & IAllProps> = ({
  value,
  onChange,
  initialValue,
  height = 500,
}) => {
  return (
    <BundledEditor
      value={value}
      onEditorChange={onChange}
      initialValue={initialValue}
      init={{
        height,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "wordcount",
          "table", // Плагин table должен быть включен
          "image",
          "media",
          "imagetools",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "table tabledelete | " + // Кнопки таблицы
          "tableprops tablerowprops tablecellprops | " + // Свойства таблицы
          "tableinsertrowbefore tableinsertrowafter tabledeleterow | " + // Управление строками
          "tableinsertcolbefore tableinsertcolafter tabledeletecol | " + // Управление колонками
          "image |" +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        table_toolbar: "tableprops tablerowprops tablecellprops",
        table_use_colgroups: true,
        table_appearance_options: true,
        image_advtab: true, // Показывать дополнительные настройки изображений
        image_title: true,
        automatic_uploads: true, // Разрешить автоматическую загрузку
        paste_data_images: true,
        file_picker_callback: (
          callback: (obj: string, property: { title: string }) => void,
          value: any,
          meta: any
        ) => {
          if (meta.filetype === "image") {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = () => {
              if (input.files && input.files.length > 0) {
                const file = input.files[0];
                callback(URL.createObjectURL(file), { title: file.name });
              }
            };
            input.click();
          }
        },
      }}
    />
  );
};
