import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

export default function RootErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage: string;
  let errorDetails: string | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || "Page not found";
    errorDetails = error.data?.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  const handleReset = () => {
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h1 style={{ color: "#dc3545", marginBottom: "20px" }}>
        Oops! Something went wrong
      </h1>
      <p style={{ color: "#6c757d", marginBottom: "30px" }}>
        We're sorry for the inconvenience. The application encountered an
        unexpected error.
      </p>

      {import.meta.env.DEV && errorDetails && (
        <details
          style={{
            marginBottom: "20px",
            padding: "20px",
            backgroundColor: "#fff",
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            textAlign: "left",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <summary
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Error Details (Development Only)
          </summary>
          <p
            style={{
              color: "#dc3545",
              fontFamily: "monospace",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            {errorMessage}
          </p>
          <pre
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "12px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {errorDetails}
          </pre>
        </details>
      )}

      {!import.meta.env.DEV && (
        <p
          style={{
            color: "#dc3545",
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize: "18px",
          }}
        >
          {errorMessage}
        </p>
      )}

      <div>
        <button
          onClick={handleReset}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            marginRight: "10px",
          }}
        >
          Try Again
        </button>
        <button
          onClick={handleGoHome}
          style={{
            padding: "12px 24px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
