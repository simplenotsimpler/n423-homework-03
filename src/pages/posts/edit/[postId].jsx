import PostForm from "@/components/PostForm.jsx";

export async function getServerSideProps({ params }) {
  return {
    props: { postId: params.postId },
  };
}

const EditPost = ({ postId }) => {
  return <PostForm postId={postId} />;
};

export default EditPost;
