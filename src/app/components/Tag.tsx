interface TagType {
    tagType: string;
}

export default function Tag(props:TagType) {
  return (
    <div className={"tag rounded-3xl w-fit flex px-5 py-2 " + props.tagType}>
        <p>{props.tagType}</p>
    </div>
  )
}