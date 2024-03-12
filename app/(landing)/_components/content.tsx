"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FilterComp } from "@/components/filter";
import { Filter } from "lucide-react";

interface Article {
  source: { id: string; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export const Content = () => {
    const [headingContent, setHeadingContent] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedHeading, setSelectedHeading] = useState('');
    const [page, setPage] = useState(1);

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
        setPage(1);
    };
    const handleHeadingChange = (value: string) => {
        setSelectedHeading(value);
        setPage(1);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight/1.2 &&
                !loading
            ) {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    useEffect(() => {
        if (!selectedCountry && !selectedHeading) {
            fetchInitialContent(page);
        } else {

            fetchFilteredContent(selectedCountry, selectedHeading, page);
        }
    }, [selectedCountry, selectedHeading, page]);

    const fetchInitialContent = async (page: number) => {
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5b9496671e244ce6990752f8138f18bb&page=${page}&pageSize=6`;

        try {
            const response = await axios.get(url);
            setHeadingContent(prevContent => [...prevContent, ...response.data.articles]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching initial data:', error);
            setLoading(false);
        }
    };

    const fetchFilteredContent = async (country: string, heading: string, page: number) => {
        setLoading(true);

        let url = `https://newsapi.org/v2/top-headlines?apiKey=5b9496671e244ce6990752f8138f18bb&pageSize=6&page=${page}`;

        if (country) {
            url += `&country=${country}`;
        }

        if (heading) {
            url += `&category=${heading}`;
        }

        try {
            const response = await axios.get(url);
            setHeadingContent(prevContent => {
                return page === 1 ? response.data.articles : [...prevContent, ...response.data.articles];
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    return (
        <div className="lg:flex">
            <div>
                <div className="flex items-center my-10 relative">
                    <div className="flex mr-[20px]" > <Filter/> Filters:</div>
                    <div className="top-[20rem] sticky">
                        <FilterComp onCountryChange={handleCountryChange} onHeadingChange={handleHeadingChange} />
                    </div>
                    {/* <button onClick={() => fetchFilteredContent(selectedCountry, selectedHeading, page)} className="flex ml-4 border rounded-md px-6 py-2"> <Filter/> Filter</button> */}
                </div>
                {headingContent.map((article, index) => (
                    <div key={index} className="text-start border rounded-md mb-4">
                        <img className="max-w-[40rem] w-[40rem] max-h-[25rem]" src={article.urlToImage} alt={article.title} />
                        <h2 className="font-bold text-lg p-4">{article.title}</h2>
                        <p className="text-base p-4">{article.description}</p>
                    </div>
                ))}
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};