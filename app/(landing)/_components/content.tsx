"use client"
import { FilterComp } from "@/components/filter";
import axios from "axios";
import { Filter } from "lucide-react";
import React, { useEffect, useState } from "react";

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
    const [headingContent, setHeadingContent] = useState<Article[]>([]); // Define the type
    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedHeading, setSelectedHeading] = useState('');

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
    };
    const handleHeadingChange = (value: string) => {
        setSelectedHeading(value);
    };

    useEffect(() => {
        fetchInitialContent();
    }, []);

    const fetchInitialContent = async () => {
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5b9496671e244ce6990752f8138f18bb`;

        try {
            const response = await axios.get(url);
            setHeadingContent(response.data.articles);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching initial data:', error);
            setLoading(false);
        }
    };

    const fetchFilteredContent = async (country: string, heading: string) => {
        if (country && heading) {
            setLoading(true);
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${heading}&apiKey=5b9496671e244ce6990752f8138f18bb`;

            try {
                const response = await axios.get(url);
                setHeadingContent(response.data.articles);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
    };

    return (
        <div className="lg:flex">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="flex justify-between items-center my-[10px] relative">
                        <div className="top-[20rem] sticky">
                            <FilterComp onCountryChange={handleCountryChange} onHeadingChange={handleHeadingChange} />
                        </div>
                        <button onClick={() => fetchFilteredContent(selectedCountry, selectedHeading)} className="flex ml-[10px] border rounded-md px-[30px] py-[4px]"> <Filter/> Filter</button>
                    </div>
                    {headingContent.map((article, index) => (
                        <div key={index} className="text-start border rounded-md mb-[20px]">
                            <img className="max-w-[40rem] w-[40rem] max-h-[25rem]" src={article.urlToImage} alt={article.title} />
                            <h2 className="font-bold text-[17px] p-[10px]">{article.title}</h2>
                            <p className="text-[15px] p-[10px]">{article.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
