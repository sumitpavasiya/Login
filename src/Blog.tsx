import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './redux/store';
import { fetchProducts } from './redux/blogs/Blogsplice'
import { useNavigate } from "react-router-dom";
import { categories } from './constants'
const BlogList = () => {
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
  const [filteredList, setFilteredList] = useState<BLogs[]>([]);
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  useEffect(() => {
    setFilteredList(list)
  }, [list])

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categoryData = (items: string) => {
    const normalizedItem = items.replace(/\s+/g, '').toLowerCase();

    if (normalizedItem === 'all') {
      setFilteredList(list);
    } else {
      const data = list.filter(
        (item: BLogs) =>
          item.category.replace(/\s+/g, '').toLowerCase() === normalizedItem
      );
      setFilteredList(data);
    }
  };
  const navigate = useNavigate();

  const handleshare = (item: BLogs) => {
    // navigate(`/blog/${item.title}`, { state: { item } });
    navigate(`/blog/${item.category}/${item.id}`, { state: { item } });
  }
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">

      <div className="space-y-4">
        <p className="text-sm flex items-center gap-1">
          <span>Home /</span> <span className="font-semibold">Blogs</span>
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold">Blogs</h1>
        <p className="text-lg sm:text-xl md:w-3/5 font-normal">
          We are here with a mission to connect pet-parents with the pet services and businesses in India.
        </p>


        <div className="overflow-x-auto">
          <div className="flex sm:flex-wrap gap-2 mt-4 w-max sm:w-full">
            {categories.map((item, index) => (
              <button
                onClick={() => categoryData(item)}
                className="px-4 py-2 border border-orange-200 rounded-full text-sm hover:bg-orange-500 hover:text-white transition whitespace-nowrap"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredList.map((item) => (
          <div className="space-y-2 cursor-pointer" onClick={() => handleshare(item)}>
            <img
              src={item.thumbnail}
              alt="Blog"
              className="w-full  object-cover rounded-lg"
            />
            <div className="flex text-xs font-bold text-orange-500 items-center">
              {item.category}
            </div>
            <h3 className="text-xl font-bold leading-snug">
              {item.title.length > 60 ? `${item.title.slice(0, 60)}...` : item.title}
            </h3>
            <p className="text-sm text-primary whitespace-pre-wrap">
              {item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}
            </p>
            <p className="text-sm text-primary">{item.createdAt}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
