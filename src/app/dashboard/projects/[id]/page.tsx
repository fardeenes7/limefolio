import { getProject } from '../server';
import UpdateProjectForm from './form';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Project'
};

export default async function EditProject({
  params
}: {
  params: { id: string };
}) {
  const data = await getProject(params.id);
  if (!data) {
    return <div>Project not found</div>;
  }
  console.log(data);
  return <UpdateProjectForm data={data} id={params.id} />;
}
