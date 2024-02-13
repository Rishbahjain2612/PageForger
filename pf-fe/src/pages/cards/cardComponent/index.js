import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

function CardComponent({imgLink, header, desc, buttonText}) {
    return (
        <Card className="mt-8 w-72 "> {/* Reduced width to w-72 */}
            <CardHeader color="blue-gray" className="relative h-48 mt-6"> {/* Reduced height to h-48 */}
                <img
                    src={imgLink}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {header}
                </Typography>
                <Typography>
                    {desc}   
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button>{buttonText}</Button>
            </CardFooter>
        </Card>
    )
}

export default CardComponent;