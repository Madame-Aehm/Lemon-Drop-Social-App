import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function SearchForm({ searchInput, setSearchInput, searchResult, submitSearch, clearSearch }) {

  const handleSearchInputChanges = (e) => {
    setSearchInput({ ...searchInput, [e.target.name]: e.target.value});
  }

  return (
    <Card className='mt-4'>
      <Card.Body>
        <h5>Search:</h5>
        <Form.Text className='text-muted'>
          Fill out one or more fields and our faeries will find the best matches.
        </Form.Text>
        <br/>
        <Form.Label htmlFor='search-name'>Drink Name:</Form.Label>
        <Form.Control className='mb-2' type='text' id='search-name' value={searchInput.name} name='name' onChange={handleSearchInputChanges} />
        <Form.Label htmlFor='search-method'>Method:</Form.Label>
        <Form.Control className='mb-2' type='text' id='search-method' value={searchInput.method} name='method' onChange={handleSearchInputChanges} />
        <Form.Label htmlFor='search-ingredient'>Includes ingredient:</Form.Label>
        <Form.Control type='text' id='search-ingredient' name='ingredient' value={searchInput.ingredient} onChange={handleSearchInputChanges} />
        <Form.Text className='text-muted'>Please only type one ingredient</Form.Text>
        <br/>
        <Button className='mb-3' variant='success' onClick={submitSearch}>Search</Button>
        {searchResult && <Button className='mb-3 ms-3' variant='warning' onClick={clearSearch}>Clear Search</Button>}
      </Card.Body>
  </Card>
  )
}

export default SearchForm