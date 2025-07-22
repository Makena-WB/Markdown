import { Col, Form, Row, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { useState } from "react";
import { useRef } from "react";
import type { FormEvent } from "react";
import { v4 as uuidV4 } from "uuid";
import type { Tag, NoteData } from "./App";


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag []
}


export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])


    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: [] 
        })

    }
    return(
         <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                <Form.Group controlId="noteTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={titleRef} type="text" placeholder="Enter note title" />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="tags"> 
                    <Form.Label>Tags</Form.Label>
                    <CreatableReactSelect
                        onCreateOption={label => {
                            const newTag= { id: uuidV4(), label }
                            onAddTag(newTag)
                            setSelectedTags(prev => [...prev, newTag])
                        }} 
                        value={selectedTags.map(tag => {
                            return {label: tag.label, value: tag.id}
                        })}
                        options={availableTags.map(tag => {
                            return {label: tag.label, value: tag.id}
                        })}
                        onChange={tags => {
                            setSelectedTags(tags.map(tag => {
                                return {id: tag.value, label: tag.label}
                            }))
                        }}
                        isMulti
                    />
                </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref={markdownRef} required as="textarea" placeholder="Enter note body" rows={15}/>
            </Form.Group>
            <Stack direction="horizontal" gap={2} className="justify-content-end">
                <Button type="submit" variant="primary">Save</Button>
                <Link to="..">
                    <Button type="button" variant="outline-secondary">Cancel</Button>
                </Link>  
            </Stack>
        </Stack>
    </Form>
    )
}