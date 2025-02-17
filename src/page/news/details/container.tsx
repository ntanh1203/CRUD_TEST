import { useCallback, useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import NewsDetailsView from "./view";
import { useAppContext } from "../../../context/AppContext";

export type FormProps = {
  label: string;
  content: string;
};

const NewsDetailsContainer = () => {
  const navigate = useNavigate();
  const { id, action } = useParams();

  const { data, updateData } = useAppContext();

  const hasUpdatedViews = useRef(false);
  const isView = action === "view";

  const newsDetails = useMemo(() => {
    return data?.find((item) => item.id === id);
  }, [id, data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: newsDetails,
  });

  const handleCreate = useCallback(
    (newData: FormProps) => {
      const payload = {
        ...newData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        views: 0,
        order: 0,
      };

      updateData((prev) => {
        const numberMax = Math.max(
          ...(prev || []).map((map: { order?: number }) => map.order ?? 0)
        );

        return [...prev, { ...payload, order: numberMax + 1 }];
      });
    },
    [updateData]
  );

  const handleUpdate = useCallback(
    (newData: FormProps) => {
      updateData((prev) =>
        prev?.map((option) => {
          if (option.id === id) {
            return {
              ...option,
              label: newData.label,
              content: newData.content,
            };
          }
          return option;
        })
      );
    },
    [id, updateData]
  );

  const onSubmit: SubmitHandler<FormProps> = (newData) => {
    if (id) {
      handleUpdate(newData);
    } else {
      handleCreate(newData);
    }
    navigate("/news");
  };

  useEffect(() => {
    if (!newsDetails && ["view", "edit"].includes(action || "")) {
      navigate("/news");
    }
  }, [action, newsDetails, navigate]);

  useEffect(() => {
    if (isView && !hasUpdatedViews.current) {
      updateData((prev) =>
        prev?.map((option) => {
          if (option.id === id) {
            return { ...option, views: option.views + 1 };
          }
          return option;
        })
      );
      hasUpdatedViews.current = true;
    }
  }, [action, id, updateData, hasUpdatedViews, isView]);

  return (
    <NewsDetailsView
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
    />
  );
};

export default NewsDetailsContainer;
