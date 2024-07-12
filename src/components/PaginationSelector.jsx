/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const PaginationSelector = ({ pagination_Info: { page, totalPages },onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }


  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}

        {pageNumbers.map((number) => (
          <>
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                onClick={() => onPageChange(number)}
                isActive={page === number}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          </>
        ))}

        {page !== pageNumbers.length && (
          <PaginationItem >
            <PaginationNext href="#" onClick={() => onPageChange(page+1)}  />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;
