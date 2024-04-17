import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import Header from '../components/Header';
import ShopContext from '../context/shop/shopContext';
import Loading from '../components/Loading';

const Blog = () => {
  const { getPosts, posts, orderLoading } = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  // Handle search input change
  const handleSearchInputChange = (event) => setSearchQuery(event.target.value);

  // Handle search button click
  const handleSearchClick = () => {
    if (searchQuery.trim() === '') {
      setSearchResult([]); // Clear search results if the query is empty
    } else {
      const result = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResult(result);
    }
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchResult.length > 0 ? searchResult.slice(indexOfFirstPost, indexOfLastPost) : (posts || []).slice(indexOfFirstPost, indexOfLastPost);

  // Handle pagination click
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    const maxPage = Math.ceil((searchResult.length > 0 ? searchResult.length : (posts || []).length) / postsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Toggle full post display
  const handleReadMoreClick = (postId) => {
    setExpandedPostId((prevState) => (prevState === postId ? null : postId));
  };

  if (posts === null) {
    // Handle loading state while fetching data
    return (
      <div style={{ minHeight: '75vh' }}>
        <Header
          image='https://images.unsplash.com/photo-1497008386681-a7941f08011e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
          title='Our Blog'
          subTitle='KEEPING YOU WELL INFORMED'
        />
        <Container>
          <div
            className='d-flex align-items-center justify-content-center'
            style={{ height: 200 }}
          >
            <Loading />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '75vh' }}>
      <Header
        image='https://images.unsplash.com/photo-1497008386681-a7941f08011e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
        title='Our Blog'
        subTitle='KEEPING YOU WELL INFORMED'
      />

      <Container>
        {/* Search Bar */}
        <Form>
          <Form.Group controlId='search'>
            <Form.Control
              type='text'
              placeholder='Search blog posts...'
              onChange={handleSearchInputChange}
              value={searchQuery}
              style={{ maxWidth: '300px', marginTop: '20px' }} // Adjust width for responsiveness
            />
            <Button
              onClick={handleSearchClick}
              style={{ marginLeft: '8px', marginTop: '5px', color: 'white', backgroundColor: 'green' }} // Add space between the search input and search button
            >
              Search
            </Button>
          </Form.Group>
        </Form>

        {orderLoading ? (
          <div
            className='d-flex align-items-center justify-content-center'
            style={{ height: 200 }}
          >
            <Loading />
          </div>
        ) : (
          <>
            {/* Display filtered and paginated posts */}
            {currentPosts.length === 0 ? (
              <div>No matching blog posts found.</div>
            ) : (
              currentPosts.map((post) => (
                <div key={post.id}>
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <div
                        className='d-flex justify-content-center'
                        style={{ marginTop: 60 }}
                      >
                        <div
                          style={{
                            backgroundImage: `url(${post.image})`,
                            width: '100%',
                            height: 350,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            borderRadius: 5,
                          }}
                        ></div>
                      </div>
                    </Col>
                    <Col md={8}>
                      <div>
                        <p>
                          {post.date} | {post.category}
                        </p>
                        <h1>{post.title}</h1>
                        {expandedPostId === post.id ? (
                          <p>{post.description}</p>
                        ) : (
                          <p>{`${post.description.slice(0, 150)}...`} <Button
                            onClick={() => handleReadMoreClick(post.id)}
                            variant='link'
                            style={{ color: 'green', padding: 0, marginLeft: '5px' }}
                          >
                            Continue reading
                          </Button></p>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              ))
            )}

            {/* Pagination */}
            <div className='d-flex justify-content-center mt-4'>
              {/* Add Bootstrap classes to create spaces between buttons */}
              <Button
                onClick={handlePreviousClick}
                disabled={currentPage === 1}
                className='mr-2' // Add space on the right side of the button
                style={{ backgroundColor: 'green' }} // Make the button green
              >
                Previous
              </Button>
              <Button
                onClick={handleNextClick}
                disabled={(searchResult.length > 0 ? currentPosts.length : posts.length) < postsPerPage}
                style={{ backgroundColor: 'green', marginLeft: '10px' }} // Make the button green
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Blog;
