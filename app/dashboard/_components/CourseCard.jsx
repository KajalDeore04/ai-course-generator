import Image from "next/image";
import React from "react";
import { HiMiniEllipsisVertical, HiOutlineBookOpen } from "react-icons/hi2";
import DropDownOption from "./DropDownOption";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

const CourseCard = ({ course, refreshData, displayUser = false }) => {
  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList.id });

    if (resp) {
      refreshData();
    }
  };

  return (
    <div className="shadow-lg p-2 rounded-lg border hover:scale-105 transition-all cursor-pointer mt-4">
      <Link href={"/course/" + course?.courseId}>
        <Image
          src={"/placeholder.png"}
          width={300}
          height={300}
          alt="placeholder"
          className="w-full h-[200px] object-cover rounded-lg"
        />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex justify-between items-center">
          {course?.courseOutput?.courseName}{" "}
          {!displayUser && <DropDownOption handleOnDelete={() => handleOnDelete()}>
            <HiMiniEllipsisVertical />
          </DropDownOption>}
        </h2>

        <p className="text-sm text-gray-400 my-2">
          {course?.courseOutput?.category}
        </p>

        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm">
            <HiOutlineBookOpen />
            {course?.courseOutput?.noOfChapters} Chapters
          </h2>

          <h2 className="text-sm bg-purple-50 text-primary p-1 rounded-sm">
            {course?.courseOutput?.level}
          </h2>
        </div>
       {displayUser &&  <div className="flex mt-2 gap-2 items-center">
            <Image src={course?.userProfileImage} width={30} height={30} alt="user" className="rounded-full" />
            <h2 className="text-sm">{course?.userName}</h2>
        </div>}
      </div>
    </div>
  );
};

export default CourseCard;
