import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './redux/store';
import { fetchProducts } from './redux/blogs/Blogsplice'
const Blogpage = () => {

  const { id } = useParams();

  console.log(id);
  interface BLogs {
    id: string;
    title: string;
    description: string;
    conclusion: string;
    thumbnail: string;
    category: string;
    createdAt: string;
  }
  const { list, loading, error } = useSelector((state: RootState) => state.blogs);
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const [filteredList, setFilteredList] = useState<BLogs | null | undefined>();
  const [suggestion, setsuggestion] = useState<BLogs[]>([]);
  useEffect(() => {
    const found = list.find((t) => t.id === id);
    setFilteredList(found)
  }, [list])

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const copy = [...list]
    copy.splice(Number(id)-1, 1)
    setsuggestion(copy)
  }, [list])
  console.log(suggestion);

  return (
    <>

      <div className="max-w-[630px] md:mx-auto px-4 md:px-0">
        <h1 className="mb-2 font-bold leading-snug capitalize sm:leading-6 text-22 lg:leading-tight md:text-3xl sm:text-2xl lg:text-4xl">{filteredList?.title}</h1>
      </div>
      <div className='max-w-[846px] md:mt-11 mt-4 md:mx-auto px-4 md:px-0'>
        <img className='w-full !relative md:!h-[580px] !h-[250px] md:rounded-lg rounded-sm overflow-hidden object-cover' src={filteredList?.thumbnail} alt={filteredList?.title} />
      </div>

      <div className=" max-w-[630px] md:mt-11 mt-4 md:mx-auto mx-5 px-4 md:px-0">
        <div className="text-sm md:text-lg">
          <p className='whitespace-pre-wrap ' >{filteredList?.description}</p>
        </div>

        <div className="bg-[#fff5f0]  my-10 rounded-lg p-5 md:px-7 md:py-7">
          <h3 className="text-primary md:text-xl md:leading-7 text-xl font-semibold">Conclusion</h3>
          <p className="md:pt-2 pt-[6px] md:text-lg text-base w-full">{filteredList?.conclusion}</p>
        </div>
        <div className="font-semibold sm:text-4xl sm:leading-7 text-22">Must read<span className="mx-1 text-orange-500">Resources</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 mt-12">
          {suggestion.map((item) => (
            <div className="space-y-2 cursor-pointer">
              <img
                src={item.thumbnail}
                alt="Blog"
                className="w-full  object-cover rounded-lg"
              />
              <div className="flex text-xs font-bold text-orange-500 items-center">
                {item.category}
              </div>
              <h3 className="text-xl font-bold leading-snug">
                {item.title}
              </h3>

              <p className="text-sm text-primary">{item.createdAt}</p>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Blogpage