interface ErrorTextProps {
  errorMessage: string;
}

export const ErrorText = ({ errorMessage }: ErrorTextProps) => {
  return (
    <div>
      {errorMessage && (
        <div className="text-sm font-medium text-destructive py-2">{errorMessage}</div>
      )}
    </div>
  );
};
