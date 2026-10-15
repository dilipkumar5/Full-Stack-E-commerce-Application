import { Skeleton as MuiSkeleton } from "@mui/material";
const Skeleton = () => {
  return (
    <div>
        <MuiSkeleton
            variant="rounded"
            height={160}
            animation="wave"
            sx={{ bgcolor: "grey.300" }}
        />
                
        <MuiSkeleton
            width="60%"
            sx={{ bgcolor: "grey.400", mt: 1 }}
        />
                
        <MuiSkeleton
            width="80%"
            sx={{ bgcolor: "grey.400" }}
        />
                
        <MuiSkeleton
            width="45%"
            sx={{ bgcolor: "grey.400" }}
        />
    </div>
  )
}

export default Skeleton;