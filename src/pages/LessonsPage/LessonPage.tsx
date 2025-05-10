import { FC } from "react";
import { useParams } from "react-router";
import { Lesson } from "../../components/Lesson/Lesson";
import { LessonDto } from "../../dto/LessonDto/LessonDto";
import { Queries } from "../../hooks/queries";

export const LessonPage: FC = () => {
  const { id } = useParams();

  const { data, error, isFetching } = Queries.get<LessonDto>(
    "lesson/get-by-id/" + id,
    ["lesson/get-by-id"]
  );

  // if (error) return { error };
  if (isFetching) return <h1>Is Fetching</h1>;

  return (
    <div className="lesson-page">
      {data && (
        <Lesson
          title={data.title}
          description={data.description}
          body={data.body}
        />
      )}
    </div>
  );
};
