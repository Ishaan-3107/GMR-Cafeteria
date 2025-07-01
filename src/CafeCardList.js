import CafeCard from './CafeCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const cafeCards = [
    {
        image: "/delhi_cafe_1.jpg",
        title: "Global Flavors",
        description: "A large, spacious dining area featuring multiple food outlets, vibrant seating arrangements, and a welcoming ambiance.",
    },
    {
        image: "/delhi_cafe_2.jpg",
        title: "Cafeteria 2",
        description: "A vibrant, well-designed cafeteria with multiple kitchens serving global and local cuisines.",
    },
    {
        image: "/delhi_cafe_3.jpg",
        title: "Cafeteria 3",
        description: "A clean, efficient dining environment offering balanced meals, custom salads, and grab-and-go options for busy professionals.",
    },
    {
        image: "/delhi_cafe_4.jpg",
        title: "Cafeteria 4",
        description: "A modern dining zone with diverse food outlets catering to every taste and preference.",
    },
];

export default function CafeCardList() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '3rem',
                padding: '2rem',
                marginTop: "-10px"
            }}
        >
            {cafeCards.map((cafe, index) => (
                <Box
                    key={index}
                    sx={{
                        flex: {
                            xs: '0 1 100%',
                            sm: '0 1 calc(50% - 2rem)',
                            md: '0 1 calc(33.33% - 2rem)'
                        },
                        boxSizing: 'border-box',
                    }}
                >
                    <CafeCard
                        image={cafe.image}
                        title={cafe.title}
                        description={cafe.description}
                    />
                </Box>
            ))}
        </Box>
    );
}
