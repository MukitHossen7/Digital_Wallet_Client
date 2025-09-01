import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <Helmet>
        <title>NotFound - NEOPAY</title>
        <meta name="description" content="This is NotFound Page" />
      </Helmet>
      <Card className="max-w-lg w-full text-center shadow-md">
        <CardHeader>
          <CardTitle className="text-8xl font-extrabold text-red-500">
            404
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl md:text-3xl font-bold">Page Not Found</h2>
          <p className="mt-3">
            Oops! The page you are looking for doesn’t exist or has been moved.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
