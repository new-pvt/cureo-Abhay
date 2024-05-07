import React, { memo } from "react";
import { Link } from "react-router-dom";

export const H1 = memo(({ content = "", className = "" }) => {
    return (
        <h1
            className={`font-f1 font-w3 leading-[59.99px] text-[45px] text-c15 ${className}`}
        >
            {content}
        </h1>
    );
});

export const H2 = memo(({ content = "", className = "" }) => {
    return (
        <h2
            className={`font-f1 font-w2 leading-[55.52px] text-[1.5rem] md:text-[40px] text-c15 ${className}`}
        >
            {content}
        </h2>
    );
});
export const H5 = memo(({ content = "", className = "" }) => {
    return (
        <h5
            className={`font-f1 font-w2 leading-[55.52px] text-[2.5rem] md:text-[40px] text-c16 ${className}`}
        >
            {content}
        </h5>
    );
});
export const H6 = memo(({ content = "", className = "" }) => {
    return (
        <h6
            className={`font-f1 font-w2 leading-[33.32px] md:text-[1.563rem]  text-c16 ${className}`}
        >
            {content}
        </h6>
    );
});
export const H7 = memo(({ content = "", className = "" }) => {
    return (
        <h6
            className={`font-f2 font-w2 leading-[22.5px] md:text-[0.938rem]  text-c20 ${className}`}
        >
            {content}
        </h6>
    );
});
export const H8 = memo(({ content = "", className = "" }) => {
    return (
        <h6
            className={`font-f2 font-w1 leading-[22.5px] md:text-[0.938rem]  text-c20 ${className}`}
        >
            {content}
        </h6>
    );
});
export const H4 = memo(({ content = "", className = "" }) => {
    return (
        <h2
            className={`font-f2 font-w2 leading-[19.56px] md:leading-[24.44px] text-[1rem] md:text-[1.25rem] text-c15 ${className}`}
        >
            {content}
        </h2>
    );
});
export const P1 = memo(({ content = "", className = "" }) => {
    return (
        <p
            className={`font-f2 font-w1 leading-[24px] text-[1rem] text-c12 ${className}`}
        >
            {content}
        </p>
    );
});
export const P2 = memo(({ content = "", className = "" }) => {
    return (
        <p
            className={`font-f3 font-semibold leading-[18.07px] text-[13px] text-c12 ${className}`}
        >
            {content}
        </p>
    );
});

export const P3 = memo(({ content = "", className = "" }) => {
    return (
        <p
            className={`font-f2 font-w2 leading-[22.5px] text-[13px] text-c16 ${className}`}
        >
            {content}
        </p>
    );
});

export const Span = memo(({ content = "", className }) => {
    return (
        <p
            className={`text-[#706D6D] font-f3 font-w1 leading-[15.6px] text-[13px] ${className}`}
        >
            {content}
        </p>
    );
});
export const Span2 = memo(({ children, className = "" }) => {
    return (
        <p
            className={`font-f2 font-w1 leading-[19.5px] text-[13px] text-c11 ${className}`}
        >
            {children}
        </p>
    );
});
export const P4 = memo(({ content = "", className = "" }) => {
    return (
        <p
            className={`font-f3 font-w2 leading-[22.5px] text-[15px] text-c16 ${className}`}
        >
            {content}
        </p>
    );
});

export const P5 = memo(({ content = "", className = "", onclick }) => {
    return (
        <p
            onClick={onclick}
            className={`font-f3 font-w2 leading-[15.6px] text-[0.813rem] text-c14 ${className}`}
        >
            {content}
        </p>
    );
});

export const P6 = memo(({ content = "", className = "" }) => {
    return (
        <p
            onClick={onclick}
            className={`font-f3 font-[400] leading-[18.6px] text-[0.825rem] text-c16 ${className}`}
        >
            {content}
        </p>
    );
});

export const FormLable = memo(
    ({ content = "", className = "", htmlFor = "" }) => {
        return (
            <label
                htmlFor={htmlFor}
                className={`font-f3 font-w2 leading-[15.6px] text-[0.813rem] text-c3 ${className}`}
            >
                {content}
            </label>
        );
    }
);

export const FormSpan = memo(({ content = "", className = "", onclick }) => {
    return (
        <span
            onClick={onclick}
            className={` font-f3 font-w1 leading-[15.6px] text-[0.813rem] text-c3 cursor-pointer ${className}`}
        >
            {content}
        </span>
    );
});
export const ErrorSpan = memo(({ content = "", className = "" }) => {
    return (
        <span
            onClick={onclick}
            className={`font-f3 font-[400] leading-[12px] text-[0.825rem] text-[c24] ${className}`}
        >
            {content}
        </span>
    );
});

export const LinkText = memo(
    ({ content = "", className = "", to, onclick }) => {
        return (
            <Link
                to={to}
                onClick={onclick}
                className={`font-f2 font-w1 leading-[15.89px] text-[0.825rem] ${className}`}
            >
                {content}
            </Link>
        );
    }
);
export const LinkTextWithIcon = memo(
    ({ content = "", className = "", to, onclick, children }) => {
        return (
            <Link
                to={to}
                onClick={onclick}
                className={`font-f3 font-w1 leading-[15.89px] text-[0.813rem] ${className}`}
            >
                {content}
                {children}
            </Link>
        );
    }
);

export const TextButton = memo(({ content = "", className = "", onclick }) => {
    return (
        <button
            onClick={onclick}
            className={`font-f2 font-w1 leading-[15.89px] text-[0.813rem] text-c16 ${className}`}
        >
            {content}
        </button>
    );
});

const Text = () => {
    return <div>text</div>;
};

export default Text;
