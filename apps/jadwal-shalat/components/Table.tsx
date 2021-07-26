import React  from 'react';
import {useTable} from 'react-table'
import styles from '../styles/Table.module.css'

function Table({schedule}) {
    return (
        <div className={styles.table_container}>
            <table>
                <tr>
                    <th>Tengah Malam</th>
                    <td>{schedule['Midnight']}</td>
                </tr>
                <tr>
                    <th>Imsak</th>
                    <td>{schedule['Imsak']}</td>
                </tr>
                <tr>
                    <th>Fajar</th>
                    <td>{schedule['Fajr']}</td>
                </tr>
                <tr>
                    <th>Terbit Matahari</th>
                    <td>{schedule['Sunrise']}</td>
                </tr>
                <tr>
                    <th>Dzuhur</th>
                    <td>{schedule['Dhuhr']}</td>
                </tr>
                <tr>
                    <th>Ashar</th>
                    <td>{schedule['Asr']}</td>
                </tr>
                <tr>
                    <th>Tenggelam Matahari</th>
                    <td>{schedule['Sunset']}</td>
                </tr>
                <tr>
                    <th>Maghrib</th>
                    <td>{schedule['Maghrib']}</td>
                </tr>
                <tr>
                    <th>Isya'</th>
                    <td>{schedule['Isha']}</td>
                </tr>
            </table>
        </div>
    )
}

export default Table