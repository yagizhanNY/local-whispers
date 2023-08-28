"use client";

import { deleteWhispComment } from "@/redux/features/whisp-comment";
import { useAppDispatch } from "@/redux/hooks";
import { useCallback, useRef } from "react";

type PageProps = {
  whispCommentId: string;
};

export default function WhispCommentDropdown({ whispCommentId }: PageProps) {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLLabelElement>();
  const dropdownRefCallback = useCallback(
    (dropdownElement: HTMLLabelElement) => {
      dropdownRef.current = dropdownElement;
      if (dropdownRef.current) {
        dropdownRef.current.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      }
    },
    []
  );

  const handleDeleteClick = () => {
    dispatch(deleteWhispComment(whispCommentId));
  };
  return (
    <div className="dropdown dropdown-end z-10">
      <label
        ref={dropdownRefCallback}
        tabIndex={0}
        className="btn btn-circle btn-ghost btn-xs text-info"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-dots text-gray-400"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        </svg>
      </label>
      <div
        tabIndex={0}
        className="card compact dropdown-content z-[1] shadow rounded-box border border-gray-400 bg-black"
      >
        <div className="card-body">
          <ul className="flex flex-col">
            <li>
              <button
                onClick={() => handleDeleteClick()}
                className="flex text-sm items-center gap-2 text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-trash"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 7l16 0"></path>
                  <path d="M10 11l0 6"></path>
                  <path d="M14 11l0 6"></path>
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                </svg>{" "}
                <p>Delete</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
