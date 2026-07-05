import { useParams } from "react-router-dom";

/**
 * Dislpays the information for the selected podcast show based on ID
 *
 * @returns {JSX.Element}
 */
export default function ShowDetails() {
  const { id } = useParams();

  return (
    <main>
      <h2>Show Details</h2>
      <p>Show ID: {id}</p>
    </main>
  );
}
