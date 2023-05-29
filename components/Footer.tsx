import styles from "@/styles/Home.module.css";
import React from "react";

export function Footer() {
    return (
        <div className="flex justify-center items-center relative flex-col">
            <div className="text-[#5f6368] text-[0.8rem] m-6">
                <p>
                    Powered by{" "}
                    <a href="https://openai.com/" target="_blank" className="text-[#7a7d81] font-medium">
                        OpenAI
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}