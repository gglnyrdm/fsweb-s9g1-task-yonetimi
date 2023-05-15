import React from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';


export default function TaskHookForm({kisiler, submitFn}) {

  const {register,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm({
    mode:"onChange",
    defaultValues: {
      title: "",
      description: "",
      people: "",
    }
  });

  const formSubmit = (data) => {
    console.log(data)
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  };


  return (
    <form className="taskForm" onSubmit={handleSubmit(formSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {required: "Task başlığı yazmalısınız"})}
        />
        <p className="input-error">{errors?.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description",{
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value:10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        <p className="input-error">{errors?.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people",{
                  required: "Lütfen en az bir kişi seçin",
                  validate: peopleList => peopleList.length < 4 || "En fazla 3 kişi seçebilirsiniz"
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors?.people?.message}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}

 