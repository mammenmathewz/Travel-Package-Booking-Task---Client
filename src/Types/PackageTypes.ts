export type PackageProps = {
    _id: Key | null | undefined;
    from: string;
    to: string;
    startDate: string;
    endDate: string;
    basePrice: number;
    bookingCount?: number;
  };
  