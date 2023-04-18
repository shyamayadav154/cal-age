import { format } from "date-fns";
import React, { useRef, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { FC, InputHTMLAttributes } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ReactComponent as ArrowIcon } from "./assets/icon-arrow.svg";

const schema = z.object({
  day: z.number({
    required_error: "This field is required",
    invalid_type_error: "This field is required",
  }).min(1, {
    message: "Must be valid day",
  }).max(31, {
    message: "Must be valid day",
  }),
  month: z.number(
    {
      required_error: "This field is required",
      invalid_type_error: "This field is required",
    },
  ).min(1, {
    message: "Must be valid month",
  }).max(12, {
    message: "Must be valid month",
  }),
  year: z.number(
    {
      required_error: "This field is required",
      invalid_type_error: "This field is required",
    },
  ).min(1990, {
    message: "Must be valid year",
  }).max(2023, {
    message: "Must be valid year",
  }),
});

function App() {
  const [dateDiff, setDateDiff] = useState<null | Date>(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  console.log({ errors });

  const onSubmit = (data) => console.log(data);

  function onSubmitHandler(data) {
    console.log(data);
    const { day, month, year } = data;
    const date = new Date(year, month - 1, day);
    // const date = format(new Date(year, month - 1, day), "dd MMMM yyyy");
    const dateDiffInDays = Math.floor(
      (new Date().getTime() - date.getTime()) / (1000 * 3600 * 24),
    );
    setDateDiff(dateDiffInDays);
    console.log(date, dateDiffInDays, "this is date");
  }

  function onChangeHandler(e: KeyboardEvent<HTMLInputElement>) {
    const key = e.key;
    const value = e.target.value;

    console.log(key, value);
    if (key === "Backspace" && value === "") {
      e.target.previousSibling.focus();
    }
  }

  const dateDiffYears: number | string = dateDiff
    ? Math.floor(dateDiff / 365)
    : "--";
  const dateDiffMonths: number | string = dateDiff
    ? Math.floor((dateDiff % 365) / 30)
    : "--";
  const dateDiffDays: number | string = dateDiff
    ? Math.floor((dateDiff % 365) % 30)
    : "--";

  console.log({
    dateDiffYears,
    dateDiffMonths,
    dateDiffDays,
  });

  return (
    <main className="text-2xl font-medium grid p-5 bg-slate-100 place-content-center h-screen">
      <section className="shadow-sm p-5 m-5    xs:p-10 rounded-2xl rounded-br-[20%]  xs:rounded-br-[40%] bg-white">
        <form
          onKeyDown={onChangeHandler}
          onSubmit={handleSubmit(onSubmitHandler)}
          className="   border-b-2 border-gray-100 pb-10 xs:pr-20 xs:mr-10 relative"
        >
          <div className="flex gap-5 ">
            <FormInput
              register={register}
              id="day"
              label="Day"
              type="text"
              placeholder="DD"
              error={errors.day?.message}
            />
            <FormInput
              register={register}
              id="month"
              label="Month"
              type="text"
              placeholder="MM"
              error={errors.month?.message}
            />
            <FormInput
              register={register}
              id="year"
              label="Year"
              type="text"
              placeholder="YYYY"
              error={errors.year?.message}
            />
          </div>
          <div className="absolute mx-auto inset-x-0 xs:h-20 xs:w-20 h-5 w-5 bottom-1   xs:-right-10">
            <button className="bg-black hover:bg-brand-purple transition duration-100 p-6 xs:p-10  text-white h-full w-full grid place-content-center rounded-full">
              <ArrowIcon className='w-6 h-6 xs:h-12 xs:h-12 stroke-2' />
            </button>
          </div>
        </form>
        <article className="xs:text-6xl text-5xl my-5 space-y-2 mt-10 italic  font-[900]">
          <div>
            <span className="text-brand-purple">
              {dateDiffYears}
            </span>{" "}
            years
          </div>
          <div>
            <span className="text-brand-purple">
              {dateDiffMonths}
            </span>{" "}
            months
          </div>
          <div>
            <span className="text-brand-purple">
              {dateDiffDays}
            </span>{" "}
            days
          </div>
        </article>
      </section>
    </main>
  );
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  error: string | undefined;
}

function FormInput(props: FormInputProps) {
  const { id, label, register, error, ...otherProps } = props;
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`tracking-widest text-xs ${
          error ? "text-light-red" : "text-smoke-grey"
        } wide  font-medium uppercase  `}
      >
        {label}
      </label>
      <input
        {...otherProps}
        {...register(id, {
          valueAsNumber: true,
        })}
        type="number"
        className="border-2 placeholder:text-light-grey text-sm mt-1 font-bold pl xs:text-3xl focus:outline-none focus:border-purple-600 border-gray-50 p-2.5 w-20 xs:w-36 rounded-md"
      />
      <span className="text-xs text-light-red mt-1 italic font-thin">
        {error}
      </span>
    </div>
  );
}

export default App;
