import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function SearchForm({ searchInput, setSearchInput, searchResult, submitSearch, clearSearch }) {

  const handleSearchInputChanges = (e) => {
    setSearchInput({ ...searchInput, [e.target.name]: e.target.value.trim().toLowerCase()});
  }

  return (
    <Card className='mt-4'>
      <Card.Body>
        <h5>Search:</h5>
        <Form onSubmit={submitSearch}>
          <Form.Text className='text-muted'>
            Fill out one or more fields and our faeries will find the best matches.
          </Form.Text>
          <br/>
          <Form.Label>Drink Name:</Form.Label>
          <Form.Control className='mb-2' type='text' value={searchInput.name} name='name' onChange={handleSearchInputChanges} />
          <Form.Label>Method:</Form.Label>
          <Form.Control className='mb-2' type='text' value={searchInput.method} name='method' onChange={handleSearchInputChanges} />
          <Form.Label>Includes ingredient:</Form.Label>
          <Form.Control type='text' name='ingredient' value={searchInput.ingredient} onChange={handleSearchInputChanges} />
          <Form.Text className='text-muted'>Please only type one ingredient</Form.Text>
          <br/>
          <Button className='mb-3 mt-3' variant='success' type='submit'>Search</Button>
          {searchResult && <Button className='mb-3 ms-3 mt-3' variant='warning' onClick={clearSearch}>Clear Search</Button>}
        </Form>
      </Card.Body>
  </Card>
  )
}

export default SearchForm