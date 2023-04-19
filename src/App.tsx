import { format } from "date-fns";
import React, { useRef, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { FC, InputHTMLAttributes } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
// import { ReactComponent as ArrowIcon } from "./assets/icon-arrow.svg";

const schema = z.object({
  day: z
    .number({
      required_error: "This field is required",
      invalid_type_error: "This field is required",
    })
    .min(1, {
      message: "Must be valid day",
    })
    .max(31, {
      message: "Must be valid day",
    }),
  month: z
    .number({
      required_error: "This field is required",
      invalid_type_error: "This field is required",
    })
    .min(1, {
      message: "Must be valid month",
    })
    .max(12, {
      message: "Must be valid month",
    }),
  year: z
    .number({
      required_error: "This field is required",
      invalid_type_error: "This field is required",
    })
    .min(1990, {
      message: "Must be valid year",
    })
    .max(2023, {
      message: "Must be valid year",
    }),
});

type DateOfBirth = z.infer<typeof schema>;

function App() {
  const [dateDiff, setDateDiff] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DateOfBirth>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  console.log({ errors });

  function onSubmitHandler(data: { day: number; month: number; year: number }) {
    console.log(data);
    const { day, month, year } = data;
    const date = new Date(year, month - 1, day);
    // const date = format(new Date(year, month - 1, day), "dd MMMM yyyy");
    const dateDiffInDays = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24));
    setDateDiff(dateDiffInDays);
    console.log(date, dateDiffInDays, "this is date");
  }

  const dateDiffYears: number | string = dateDiff ? Math.floor(dateDiff / 365) : "--";
  const dateDiffMonths: number | string = dateDiff ? Math.floor((dateDiff % 365) / 30) : "--";
  const dateDiffDays: number | string = dateDiff ? Math.floor((dateDiff % 365) % 30) : "--";

  console.log({
    dateDiffYears,
    dateDiffMonths,
    dateDiffDays,
  });
  return (
    <main className='grid place-content-center p-5 h-screen text-2xl font-medium bg-slate-100'>
      <section className='shadow-sm p-5 m-5    xs:p-10 rounded-2xl rounded-br-[20%]  xs:rounded-br-[40%] bg-white'>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className='relative pb-10 border-b-2 border-gray-100 xs:pr-20 xs:mr-10'
        >
          <div className='flex gap-5'>
            <FormInput
              register={register}
              id='day'
              label='Day'
              type='text'
              placeholder='DD'
              error={errors.day?.message}
            />
            <FormInput
              register={register}
              id='month'
              label='Month'
              type='text'
              placeholder='MM'
              error={errors.month?.message}
            />
            <FormInput
              register={register}
              id='year'
              label='Year'
              type='text'
              placeholder='YYYY'
              error={errors.year?.message}
            />
          </div>
          <button className='bg-black hover:bg-brand-purple rounded-full p-4 xs:p-5 -bottom-7 xs:-bottom-10  absolute right-1/2 translate-x-1/2  xs:right-0'>
            <ArrowDownIcon className='xs:w-12 h-6 w-6 xs:h-12 text-white' />
          </button>
        </form>
        <article className='my-5 mt-10 space-y-2 text-5xl italic xs:text-6xl font-[900]'>
          <div>
            <span className='text-brand-purple'>{dateDiffYears}</span> years
          </div>
          <div>
            <span className='text-brand-purple'>{dateDiffMonths}</span> months
          </div>
          <div>
            <span className='text-brand-purple'>{dateDiffDays}</span> days
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
    <div className='flex flex-col'>
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
        type='number'
        className='p-2.5 mt-1 w-20 text-sm font-bold rounded-md border-2 border-gray-50 focus:border-purple-600 focus:outline-none placeholder:text-light-grey pl xs:text-3xl xs:w-36'
      />
      <span className='mt-1 text-xs italic font-thin text-light-red'>{error}</span>
    </div>
  );
}

export default App;
