interface Category {
    value: string;
    label: string;
    childCategories: {
        value: string;
        label: string;
    }[];
}

export const categories: Category[] = [
    {
        value: 'PROGRAMMING_LANGUAGE',
        label: '프로그래밍 언어',
        childCategories: [
            { value: 'C', label: 'C' },
            { value: 'CPP', label: 'C++' },
            { value: 'C_SHARP', label: 'C#' },
            { value: 'FLUTTER', label: 'Flutter' },
            { value: 'HTML_CSS', label: 'HTML/CSS' },
            { value: 'JAVA', label: 'Java' },
            { value: 'JAVA_SCRIPT', label: 'JavaScript' },
            { value: 'KOTLIN', label: 'Kotlin' },
            { value: 'PYTHON', label: 'Python' },
            { value: 'SWIFT', label: 'Swift' },
            { value: 'SWIFT_UI', label: 'SwiftUI' },
            { value: 'TYPE_SCRIPT', label: 'TypeScript' },
        ],
    },
    {
        value: 'WEB',
        label: '웹 개발',
        childCategories: [
            { value: 'REACT', label: 'React' },
            { value: 'NEXT_JS', label: 'Next.js' },
            { value: 'VUE_JS', label: 'Vue.js' },
            { value: 'JQUERY', label: 'jQuery' },
            { value: 'NODE_JS', label: 'Node.js' },
            { value: 'NEST_JS', label: 'Nest.js' },
            { value: 'SPRING', label: 'Spring' },
            { value: 'SPRING_BOOT', label: 'Spring Boot' },
            { value: 'SPRING_SECURITY', label: 'Spring Security' },
            { value: 'JPA', label: 'JPA' },
            { value: 'DJANGO', label: 'Django' },
            { value: 'KAFKA', label: 'Kafka' },
        ],
    },
    {
        value: 'MOBILE_APP',
        label: '모바일 앱 개발',
        childCategories: [
            { value: 'ANDROID', label: 'Android' },
            { value: 'IOS', label: 'iOS' },
            { value: 'REACT_NATIVE', label: 'React Native' },
        ],
    },
    {
        value: 'GAME_DEVELOPMENT',
        label: '게임 개발',
        childCategories: [
            { value: 'UNITY', label: 'Unity' },
            { value: 'UNREAL_ENGINE', label: 'Unreal Engine' },
            { value: 'UNREAL_CPP', label: 'Unreal C++' },
            { value: 'UE_BLUEPRINT', label: 'UE Blueprint' },
            { value: 'COMPUTER_GRAPHICS', label: 'Computer Graphics' },
            { value: 'OPEN_GL', label: 'OpenGL' },
            { value: 'GLSL', label: 'GLSL' },
        ],
    },
    {
        value: 'DATABASE',
        label: '데이터베이스',
        childCategories: [
            { value: 'MYSQL', label: 'MySQL' },
            { value: 'ORACLE', label: 'Oracle' },
            { value: 'MONGODB', label: 'MongoDB' },
            { value: 'POSTGRE_SQL', label: 'PostgreSQL' },
            { value: 'MARIADB', label: 'MariaDB' },
            { value: 'MS_SQL', label: 'MSSQL' },
            { value: 'REDIS', label: 'Redis' },
            { value: 'NEO4J', label: 'Neo4j' },
            { value: 'APOLLO', label: 'Apollo' },
            { value: 'CASSANDRA', label: 'Cassandra' },
        ],
    },
    {
        value: 'ARTIFICIAL_INTELLIGENCE',
        label: '인공지능',
        childCategories: [
            { value: 'MACHINE_LEARNING', label: '머신러닝' },
            { value: 'DEEP_LEARNING', label: '딥러닝' },
            { value: 'TENSORFLOW', label: 'Tensorflow' },
            { value: 'KERAS', label: 'Keras' },
            { value: 'PYTORCH', label: 'PyTorch' },
            { value: 'CNN', label: 'CNN' },
            { value: 'RNN', label: 'RNN' },
            { value: 'LLM', label: 'LLM' },
            { value: 'NLP', label: 'NLP' },
        ],
    },
    {
        value: 'DEVELOPMENT_TOOLS',
        label: '개발 도구',
        childCategories: [
            { value: 'VSC', label: 'Visual Studio Code' },
            { value: 'VISUAL_STUDIO', label: 'Visual Studio' },
            { value: 'INTELLIJ', label: 'IntelliJ' },
            { value: 'WEBSTORM', label: 'WebStorm' },
            { value: 'ECLIPSE', label: 'Eclipse' },
            { value: 'ANDROID_STUDIO', label: 'Android Studio' },
            { value: 'XCODE', label: 'Xcode' },
            { value: 'ATOM', label: 'Atom' },
        ],
    },
];
