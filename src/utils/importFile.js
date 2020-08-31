import Papa from 'papaparse';
import { filename } from './constants';

export default async function GetData() {
    const response = Papa.parse(await fetchCsv()).data;
    return response;
}

async function fetchCsv() {
    const response = await fetch(`/mh_classifier/data/${filename}`);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
}