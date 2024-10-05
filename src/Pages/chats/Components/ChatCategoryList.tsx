import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '@/Constants/categories.ts';
import { BiCategory } from 'react-icons/bi';
import { CiMobile3 } from 'react-icons/ci';
import { GoCode, GoDatabase, GoDeviceDesktop, GoGlobe } from 'react-icons/go';
import { PiGameController, PiHeadCircuit } from 'react-icons/pi';

interface Props {
    currentParentSkillCategory: string;
}

const categoryIconInfoList: { value: string; icon: ReactNode }[] = [
    { value: 'PROGRAMMING_LANGUAGE', icon: <GoCode /> },
    { value: 'WEB', icon: <GoGlobe /> },
    { value: 'MOBILE_APP', icon: <CiMobile3 /> },
    { value: 'GAME_DEVELOPMENT', icon: <PiGameController /> },
    { value: 'DATABASE', icon: <GoDatabase /> },
    { value: 'ARTIFICIAL_INTELLIGENCE', icon: <PiHeadCircuit /> },
    { value: 'DEVELOPMENT_TOOLS', icon: <GoDeviceDesktop /> },
];

export default function ChatCategoryList({ currentParentSkillCategory }: Props) {
    const navigate = useNavigate();

    const parentSkillCategoryList = CATEGORIES.map(category => category);

    const handleSkillCategoryButtonClick = (value: string) => {
        navigate(`/chats/${value}`);
    };

    return (
        <div className={'flex flex-col gap-y-5 rounded-xl border border-slate-300 p-3'}>
            <div className={'mx-3 flex items-center gap-x-2'}>
                <BiCategory className={'size-6'} />
                <h2 className={'text-lg font-extrabold'}>카테고리</h2>
            </div>
            <ul className={'flex w-full flex-col gap-y-3'}>
                {parentSkillCategoryList.map(parentSkillCategory => (
                    <li
                        key={parentSkillCategory.value}
                        className={`w-full [&_svg]:size-5 ${parentSkillCategory.value === currentParentSkillCategory ? '[&_svg]:text-plump-purple-600' : '[&_svg]:text-slate-500'}`}
                    >
                        <button
                            className={`flex w-full items-center gap-x-2 rounded-xl px-4 py-2.5 text-sm ${parentSkillCategory.value === currentParentSkillCategory ? 'bg-plump-purple-50 text-plump-purple-600 hover:bg-plump-purple-100 hover:text-plump-purple-700' : 'text-slate-500 hover:bg-plump-purple-50 hover:text-plump-purple-600'} font-bold transition-all`}
                            onClick={() => {
                                handleSkillCategoryButtonClick(parentSkillCategory.value);
                            }}
                        >
                            <>
                                {
                                    categoryIconInfoList.find(
                                        categoryIconInfo => categoryIconInfo.value === parentSkillCategory.value,
                                    ).icon
                                }
                                <span>{parentSkillCategory.label}</span>
                            </>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
